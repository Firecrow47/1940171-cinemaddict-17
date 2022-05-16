import MainNavigation from '../view/main-navigation-view.js';
import SortView from '../view/sort-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import PopupHideOverflowView from '../view/popup-hide-overflow-view.js';
import MainBoardView from '../view/main-board-view.js';
import {render} from '../render.js';
import NoCardView from '../view/no-card-view.js';
const body = document.querySelector('body');
const CARD_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #mainBoard = new MainBoardView();
  #filmsContainer = new FilmsContainerView;
  #buttonShowMore = new ButtonShowMoreView();
  #renderCardCount = CARD_COUNT_PER_STEP;

  constructor(boardContainer, filmsCardsModel) {
    this.boardContainer = boardContainer;
    this.filmsCardModel = filmsCardsModel;
  }

  init = () => {
    this.boardFilms = [...this.filmsCardModel.card];
    render(new MainNavigation, this.boardContainer);
    this.#renderBoard();
  };

  #handleShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.boardFilms
      .slice(this.#renderCardCount, this.#renderCardCount + CARD_COUNT_PER_STEP)
      .forEach((card) => this.#renderCard(card));

    this.#renderCardCount += CARD_COUNT_PER_STEP;

    if (this.#renderCardCount >= this.boardFilms.length) {
      this.#buttonShowMore.element.remove();
      this.#buttonShowMore.removeElement();
    }
  };


  #renderCard = (card) => {
    const cardComponent = new FilmCardView(card);
    const cardPopup = new PopupHideOverflowView(card);
    render(cardComponent, this.#filmsContainer.element.querySelector('.films-list__container'));

    const addPopup  = () => {
      body.appendChild(cardPopup.element);
      body.classList.add('hide-overflow');
    };
    const removePopup  = () => {
      body.removeChild(cardPopup.element);
      body.classList.remove('hide-overflow');
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        removePopup();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    cardComponent.element.addEventListener('click',()=>{
      addPopup();
      document.addEventListener('keydown', onEscKeyDown);
    });

    cardPopup.element.querySelector('.film-details__close-btn').addEventListener('click',() => {
      removePopup();
      document.removeEventListener('keydown', onEscKeyDown);
    });
  };

  #renderBoard = () => {
    render(this.#mainBoard, this.boardContainer);
    render(new SortView(), this.boardContainer);
    render(this.#filmsContainer, this.#mainBoard.element);
    if (this.boardFilms.every((card)=> card.isArchive)) {
      render(new NoCardView(), this.#filmsContainer.element);
    }

    if (this.boardFilms.length > CARD_COUNT_PER_STEP) {
      render(this.#buttonShowMore, this.#filmsContainer.element);

      this.#filmsContainer.element.addEventListener('click', this.#handleShowMoreButtonClick);
    }
    this.boardFilms.slice(0, CARD_COUNT_PER_STEP).forEach((card) => this.#renderCard(card));


  };
}
