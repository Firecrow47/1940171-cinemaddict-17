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
    this.#cardPopup = new PopupHideOverflowView(card);
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
      this.#cardPopup.setFavoriteClickHandler(this.#handleFavoriteClick);
      this.#cardPopup.setWatchlistClickHandler(this.#handleWatchlistClick);
      this.#cardPopup.setAlreadyWatchedClickHandler(this.#handleAlreadyWatchedClick);
      this.#cardPopup.setClickHandler(() => {
        this.removePopup();
        document.removeEventListener('keydown', this.#onEscKeyDown);
      });
    };

    this.#cardComponent.setClickHandler(()=>{
      addPopup();
      document.addEventListener('keydown', this.#onEscKeyDown);
    });
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#card, userDetails: {favorite: !this.#card.userDetails.favorite }});
  };

  #handleWatchlistClick = () => {
    this.#changeData({...this.#card, userDetails: {watchlist: !this.#card.userDetails.watchlist }});
  };

  #handleAlreadyWatchedClick = () => {
    this.#changeData({...this.#card, userDetails: {alreadyWatched: !this.#card.userDetails.alreadyWatched }});
  };
}
