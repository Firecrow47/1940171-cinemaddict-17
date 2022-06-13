import AbstractView from '../framework/view/abstract-view.js';
import {getTimeFromMins, getTimeFromHour, humanizeDateMain} from '../utils/card.js';
const createFilmCardTemplate = (card) =>{
  const {filmInfo, comments} = card;
  const maxLengthDescription = 139;
  const description = filmInfo.description.length > maxLengthDescription
    ? `${filmInfo.description.slice(0,maxLengthDescription-1)}...`
    : filmInfo.description;
  const hour = getTimeFromHour(filmInfo.runtime);
  const min = getTimeFromMins(filmInfo.runtime);

  return (
    `<article class="film-card"><a class="film-card__link">
  <h3 class="film-card__title">${filmInfo.title}</h3>
  <p class="film-card__rating">${filmInfo.totalRating}</p>
  <p class="film-card__info">
  <span class="film-card__year">${humanizeDateMain(filmInfo.release.date)}</span>
  <span class="film-card__duration">${hour}h ${min}m</span>
  <span class="film-card__genre">${filmInfo.genre}</span>
  </p>
  <img src=${filmInfo.poster} alt="" class="film-card__poster">
  <p class="film-card__description">${description}</p>
  <span class="film-card__comments">${comments.length} comments</span>
  </a>
  <div class="film-card__controls">
  <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
  <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
  <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
  </div></article>`
  );
};

export default class FilmCardView extends AbstractView {
  #card = null;

  constructor(card) {
    super();
    this.#card = card;
  }

  get template() {
    return createFilmCardTemplate(this.#card);

  }

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  setAlreadyWatchedClickHandler = (callback) => {
    this._callback.alreadyWatchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#alreadyWatchedClickHandler);
  };

  #alreadyWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  };

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__poster').addEventListener('click', this.#clickHandler);
  };

  resetClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__poster').removeEventListener('click', this.#clickHandler);
  };


  #clickHandler = (evt) => {
    evt.preventDefault();

    this._callback.click();
  };
}
