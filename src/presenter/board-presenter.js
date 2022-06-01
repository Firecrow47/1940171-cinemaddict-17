import MainNavigation from '../view/main-navigation-view.js';
import SortView from '../view/sort-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import MainBoardView from '../view/main-board-view.js';
import {render, remove, RenderPosition} from '../framework/render.js';
import NoCardView from '../view/no-card-view.js';
import CardPresenter from './card-presenter.js';
import {updateItem} from '../utils/common.js';
const CARD_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #mainBoard = new MainBoardView();
  #filmsContainer = new FilmsContainerView();
  #buttonShowMore = new ButtonShowMoreView();
  #mainNavigation = new MainNavigation();
  #renderCardCount = CARD_COUNT_PER_STEP;
  #cardPresenter = new Map();

  constructor(boardContainer, filmsCardsModel) {
    this.boardContainer = boardContainer;
    this.filmsCardModel = filmsCardsModel;
  }

  init = () => {
    this.boardFilms = [...this.filmsCardModel.card];
    this.#renderMainNavigation();
    this.#renderSort();
    this.#renderBoard();
    this.#renderFilmsContainer();
  };

  #handleShowMoreButtonClick = () => {
    this.boardFilms
      .slice(this.#renderCardCount, this.#renderCardCount + CARD_COUNT_PER_STEP)
      .forEach((card) => this.#renderCard(card));

    this.#renderCardCount += CARD_COUNT_PER_STEP;

    if (this.#renderCardCount >= this.boardFilms.length) {
      this.#buttonShowMore.element.remove();
      this.#buttonShowMore.removeElement();
    }
  };

  #renderMainNavigation = () =>{
    render(this.#mainNavigation, this.boardContainer);
  };

  #renderCard = (card) => {
    const cardPresenter = new CardPresenter(this.#filmsContainer.element,  this.#handleCardChange, this.#hidePopup);
    cardPresenter.init(card);
    this.#cardPresenter.set(card.id, cardPresenter);
  };

  #hidePopup = () => {
    this.#cardPresenter.forEach((presenter) => presenter.removePopup());
  };

  #handleCardChange = (updatedCard) => {
    this.boardFilms = updateItem(this.boardFilms, updatedCard);
    this.#cardPresenter.get(updatedCard.id).init(updatedCard);
  };

  #clearCardList = () => {
    this.#cardPresenter.forEach((presenter) => presenter.destroy());
    this.#cardPresenter.clear();
    this.#renderCardCount = CARD_COUNT_PER_STEP;
    remove(this.#buttonShowMore);
  };

  #renderBoard = () => {
    render(this.#mainBoard, this.boardContainer);
    if (this.boardFilms.every((item)=> item.length === 0)) {
      render(new NoCardView(), this.#filmsContainer.element);
    }

    this.boardFilms.slice(0, CARD_COUNT_PER_STEP).forEach((item) => this.#renderCard(item));


    if (this.boardFilms.length > CARD_COUNT_PER_STEP) {
      render(this.#buttonShowMore, this.#filmsContainer.element);

      this.#buttonShowMore.setClickHandler(this.#handleShowMoreButtonClick);
    }
  };

  #renderSort = () => {
    render(new SortView(), this.boardContainer, RenderPosition.AFTERBEGIN);
  };

  #renderFilmsContainer = () =>{
    render(this.#filmsContainer, this.#mainBoard.element);
  };
}
