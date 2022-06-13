import FilmCardView from '../view/film-card-view.js';
import PopupHideOverflowView from '../view/popup-hide-overflow-view.js';
import {render, remove, replace} from '../framework/render.js';
const body = document.querySelector('body');

export default class CardPresenter {
  #filmsContainer = null;
  #cardComponent = null;
  #cardPopup = null;
  #card = null;
  #changeData = null;
  #hidePopup = null;

  constructor(filmsContainer, changeData, hidePopup) {
    this.#filmsContainer = filmsContainer;
    this.#changeData = changeData;
    this.#hidePopup = hidePopup;
  }

  init = (card) => {
    const prevCardComponent = this.#cardComponent;
    this.#card = card;
    this.#cardComponent = new FilmCardView(card);
    this.#cardPopup = new PopupHideOverflowView(card, this.#setInnerHandlers);
    this.#cardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#cardComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#cardComponent.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
    this.#renderCardPopup();

    if (prevCardComponent === null) {
      this.#renderCard();
      return;
    }

    if (this.#filmsContainer.contains(prevCardComponent.element)) {
      replace(this.#cardComponent, prevCardComponent);
    }
    remove(prevCardComponent);
  };

  destroy = () => {
    remove(this.#cardComponent);
  };

  #renderCard = () => {
    render(this.#cardComponent, this.#filmsContainer.querySelector('.films-list__container'));
  };

  removePopup  = () => {
    if (this.#cardPopup) {
      remove(this.#cardPopup);
      body.classList.remove('hide-overflow');
    }
    this.#cardPopup.reset(this.#card);
  };

  #onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.removePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #renderCardPopup = () => {
    const addPopup  = () => {
      this.#hidePopup();
      render(this.#cardPopup, body);
      body.classList.add('hide-overflow');
      this.#setInnerHandlers();
    };

    this.#cardComponent.setClickHandler(()=>{
      addPopup();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
  };

  #setInnerHandlers = () => {
    this.#cardPopup.setEmotionClickHandler(this.#handleEmotionClick);
    this.#cardPopup.setFavoriteClickHandler(this.#handleFavoriteClickPopup);
    this.#cardPopup.setWatchlistClickHandler(this.#handleWatchlistClickPopup);
    this.#cardPopup.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClickPopup);
    this.#cardPopup.setDescriptionInputHandler(this.#descriptionInputHandler);
    this.#cardPopup.setClickHandler(() => {
      this.removePopup();
      document.removeEventListener('keydown', this.#onEscKeyDown);
    });
  };

  #descriptionInputHandler = (evt) => {
    evt.preventDefault();
    this.#cardPopup._setState({
      newComment: {
        commentText: evt.target.value,
      },
    });
  };

  #handleEmotionClick = (evt) => {
    const scrollTopPosition = this.#cardPopup.element.scrollTop;
    const value =this.#cardPopup.element.querySelector('.film-details__comment-input').value;
    this.#cardPopup.updateElement({
      newComment: {
        emotion: `${evt.target.value}.png`,
        commentText: value,
      },
    });
    this.#cardPopup.element
      .querySelectorAll('.film-details__emoji-item')
      .forEach((emotion) => {
        if(emotion.value === evt.target.value){
          emotion.setAttribute('checked', 'true');
        }});
    this.#cardPopup.element.scrollTop = scrollTopPosition;
  };

  #handleFavoriteClickPopup = () => {
    const scrollTopPosition = this.#cardPopup.element.scrollTop;
    this.#cardPopup.updateElement({
      userDetails: {
        favorite: !this.#card.userDetails.favorite,
        watchlist: this.#card.userDetails.watchlist,
        alreadyWatched: this.#card.userDetails.alreadyWatched
      }
    });
    this.#cardPopup.element.scrollTop = scrollTopPosition;
    console.log(`W${this.#card.userDetails.watchlist}, A${this.#card.userDetails.alreadyWatched}, F${this.#card.userDetails.favorite}`);
  };

  #handleWatchlistClickPopup = () => {
    const scrollTopPosition = this.#cardPopup.element.scrollTop;
    this.#cardPopup.updateElement({
      userDetails: {
        favorite: this.#card.userDetails.favorite,
        watchlist: !this.#card.userDetails.watchlist,
        alreadyWatched: this.#card.userDetails.alreadyWatched
      }
    });
    console.log(`W${this.#card.userDetails.watchlist}, A${this.#card.userDetails.alreadyWatched}, F${this.#card.userDetails.favorite}`);
    this.#cardPopup.element.scrollTop = scrollTopPosition;
  };

  #handleAlreadyWatchedClickPopup = () => {
    const scrollTopPosition = this.#cardPopup.element.scrollTop;
    this.#cardPopup.updateElement({
      userDetails: {
        favorite: this.#card.userDetails.favorite,
        watchlist: this.#card.userDetails.watchlist,
        alreadyWatched: !this.#card.userDetails.alreadyWatched
      }
    });
    console.log(`W${this.#card.userDetails.watchlist}, A${this.#card.userDetails.alreadyWatched}, F${this.#card.userDetails.favorite}`);
    this.#cardPopup.element.scrollTop = scrollTopPosition;
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#card, userDetails: {
      favorite: !this.#card.userDetails.favorite,
      watchlist: this.#card.userDetails.watchlist,
      alreadyWatched: this.#card.userDetails.alreadyWatched
    }});
    console.log(`W${this.#card.userDetails.watchlist}, A${this.#card.userDetails.alreadyWatched}, F${this.#card.userDetails.favorite}`);
  };

  #handleWatchlistClick = () => {
    this.#changeData({...this.#card, userDetails: {
      favorite: this.#card.userDetails.favorite,
      watchlist: !this.#card.userDetails.watchlist,
      alreadyWatched: this.#card.userDetails.alreadyWatched
    }});

    console.log(`W${this.#card.userDetails.watchlist}, A${this.#card.userDetails.alreadyWatched}, F${this.#card.userDetails.favorite}`);
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData({...this.#card, userDetails: {
      favorite: this.#card.userDetails.favorite,
      watchlist: this.#card.userDetails.watchlist,
      alreadyWatched: !this.#card.userDetails.alreadyWatched
    }});

    console.log(`W${this.#card.userDetails.watchlist}, A${this.#card.userDetails.alreadyWatched}, F${this.#card.userDetails.favorite}`);
  };
}
