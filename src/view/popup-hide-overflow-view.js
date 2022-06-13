import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {getTimeFromMins, getTimeFromHour} from '../utils/card.js';
import {humanizeDate, humanizeDateComm} from '../utils/card.js';
import {getCommentById} from '../mock/film-card.js';

const createComment = (comment) => `
<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${humanizeDateComm(comment.date)}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
    </li>
    `;

const renderComments = (comments) => {
  const allComments = comments.map((comment) => createComment(comment)).join(' ');

  return `<ul class="film-details__comments-list">
        ${allComments}
      </ul>`;
};

const renderEmotion = (emotion) => `
<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="${emotion}">
  <label class="film-details__emoji-label" for="emoji-${emotion}">
    <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
  </label>
`;

const renderEmotionsList = () =>{
  const EMOTIONS = [
    'smile',
    'sleeping',
    'puke',
    'angry'
  ];
  const allEmotions = EMOTIONS.map((emotion) => renderEmotion(emotion)).join(' ');
  return `
  <div class="film-details__emoji-list">
  ${allEmotions}
  </div>
  `;
};

const createFormNewComment = (card) => `<div class="film-details__new-comment">
<div class="film-details__add-emoji-label">
  <img src="images/emoji/${card.newComment.emotion}" width="55" height="55" alt="emoji-smile">
</div>

<label class="film-details__comment-label">
  <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment">${card.newComment.commentText}</textarea>
</label>

${renderEmotionsList()};
</div>`;

const createHideOverflowTemplate = (card) => {
  const {filmInfo, comments} = card;
  const hour = getTimeFromHour(filmInfo.runtime);
  const min = getTimeFromMins(filmInfo.runtime);
  const genreTitle = filmInfo.genre.length === 1
    ? 'Genre'
    : 'Genres';

  const genres = () => filmInfo.genre.map((genre) => (`<span class="film-details__genre">${genre}</span>`)).join('');

  return (
    `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="film-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src=${filmInfo.poster} alt="">

          <p class="film-details__age">+${filmInfo.ageRating}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${filmInfo.title}</h3>
              <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${filmInfo.totalRating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${filmInfo.director}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Writers</td>
              <td class="film-details__cell">${filmInfo.writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Actors</td>
              <td class="film-details__cell">${filmInfo.actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${humanizeDate(filmInfo.release.date)}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${hour}h ${min}m</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genreTitle}</td>
              <td class="film-details__cell">
                ${genres()}
            </tr>
          </table>

          <p class="film-details__film-description">
          ${filmInfo.description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
        <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
        <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
      </section>
    </div>

    <div class="film-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>
        ${renderComments(getCommentById(comments))}
        ${createFormNewComment(card)}
      </section>
    </div>
  </form>
</section>`
  );
};


export default class PopupHideOverflowView extends AbstractStatefulView {
  #innerHandlers = null;
  constructor(card, innerHandlers) {
    super();
    this._state = PopupHideOverflowView.parseCardToState(card);
    this.#innerHandlers = innerHandlers;
  }

  get template() {
    return createHideOverflowTemplate(this._state);
  }

  static parseCardToState = (card) => ({...card,
    newComment: {
      emotion: 'smile.png',
      commentText: '',
    },
  });

  static getDataWithoutDeleteComment(state) {
    const card = {...state};
    if (!card.commentText) {
      card.commentText = '';
    }
    delete card.newComment;
    return card;
  }

  reset = (card) => {
    this.updateElement(
      PopupHideOverflowView.parseCardToState(card),
    );
  };

  _restoreHandlers = () => {
    this.#innerHandlers();
  };

  setDescriptionInputHandler = (callback) => {
    this._callback.descriptionInput = callback;
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#descriptionInputHandler);
  };

  #descriptionInputHandler = (evt) => {
    evt.preventDefault();
    this._callback.descriptionInput(evt);
  };

  setEmotionClickHandler = (callback) => {
    this._callback.emotionClick = callback;
    this.element.querySelectorAll('.film-details__emoji-item').forEach((emotion) => {
      emotion.addEventListener('click', this.#emotionClickHandler);});
  };

  #emotionClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.emotionClick(evt);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };


  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#clickHandler);
  };

  #clickHandler = (evt) => {
    evt.preventDefault();

    this._callback.click();
  };
}

