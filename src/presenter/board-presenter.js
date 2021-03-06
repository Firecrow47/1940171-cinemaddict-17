import UserTitleView from '../view/user-title-view.js';
import MainNavigation from '../view/main-navigation-view.js';
import SortView from '../view/sort-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import MainBoardView from '../view/main-board-view.js';
import {render, remove, RenderPosition} from '../framework/render.js';
import NoCardView from '../view/no-card-view.js';
import CardPresenter from './card-presenter.js';
import {updateItem} from '../utils/common.js';
import {sortCardDown, sortCardRating} from '../utils/card.js';
import {SortType} from '../const.js';
const CARD_COUNT_PER_STEP = 5;
const headerElement = document.querySelector('.header');

export default class MainPresenter {
  #boardFilms = [];
  #mainBoard = new MainBoardView();
  #filmsContainer = new FilmsContainerView();
  #buttonShowMore = new ButtonShowMoreView();
  #mainNavigation = new MainNavigation();
  #renderCardCount = CARD_COUNT_PER_STEP;
  #cardPresenter = new Map();
  #sortComponent = new SortView();
  #currentSortType = SortType.DEFAULT;
  #sourcedBoardCards = [];

  constructor(boardContainer, filmsCardsModel) {
    this.boardContainer = boardContainer;
    this.filmsCardModel = filmsCardsModel;
  }

  init = () => {
    this.#boardFilms = [...this.filmsCardModel.card];
    this.#sourcedBoardCards = [...this.filmsCardModel.card];
    this.#renderSort();
    this.#renderBoard();
    this.#renderFilmsContainer();
    this.#renderUserTitle();
  };

  #handleShowMoreButtonClick = () => {
    this.#boardFilms
      .slice(this.#renderCardCount, this.#renderCardCount + CARD_COUNT_PER_STEP)
      .forEach((card) => this.#renderCard(card));

    this.#renderCardCount += CARD_COUNT_PER_STEP;

    if (this.#renderCardCount >= this.#boardFilms.length) {
      this.#buttonShowMore.element.remove();
      this.#buttonShowMore.removeElement();
    }
  };

  #renderUserTitle = () => {
    render(new UserTitleView(), headerElement);
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
    this.#boardFilms = updateItem(this.#boardFilms, updatedCard);
    this.#sourcedBoardCards = updateItem(this.#sourcedBoardCards, updatedCard);
    this.#cardPresenter.get(updatedCard.id).init(updatedCard);
  };

  #sortCards = (sortType) => {
    switch (sortType) {
      case SortType.RATING:
        this.#boardFilms.sort(sortCardRating);
        break;
      case SortType.DATE:
        this.#boardFilms.sort(sortCardDown);
        break;
      default:
        this.#boardFilms = [...this.#sourcedBoardCards];
    }

    this.#currentSortType = sortType;
  };

  #clearCardList = () => {
    this.#cardPresenter.forEach((presenter) => presenter.destroy());
    this.#cardPresenter.clear();
    this.#renderCardCount = CARD_COUNT_PER_STEP;
    remove(this.#buttonShowMore);
  };

  #renderBoard = () => {
    render(this.#mainBoard, this.boardContainer);
    if (this.#boardFilms.every((card)=> card.length === 0)) {
      render(new NoCardView(), this.#filmsContainer.element);
    }

    this.#boardFilms.slice(0, CARD_COUNT_PER_STEP).forEach((card) => this.#renderCard(card));


    if (this.#boardFilms.length > CARD_COUNT_PER_STEP) {
      render(this.#buttonShowMore, this.#filmsContainer.element);

      this.#buttonShowMore.setClickHandler(this.#handleShowMoreButtonClick);
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortCards(sortType);
    this.#clearCardList();
    this.#renderBoard();
  };

  #renderSort = () => {
    render(this.#sortComponent, this.boardContainer, RenderPosition.AFTERBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderFilmsContainer = () =>{
    render(this.#filmsContainer, this.#mainBoard.element);
  };
}
