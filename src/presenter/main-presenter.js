import MainNavigation from '../view/main-navigation-view.js';
import SortView from '../view/sort-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmCardView from '../view/film-card-view.js';
import ButtonShowMoreView from '../view/button-show-more-view.js';
import PopupHideOverflowView from '../view/popup-hide-overflow-view.js';
import MainBoardView from '../view/main-board-view.js';
import {render} from '../render.js';


const body = document.querySelector('body');

export default class MainPresenter {
  #mainBoard = new MainBoardView();
  #filmsContainer = new FilmsContainerView;
  init = (boardContainer, filmsCardsModel) => {
    this.boardContainer = boardContainer;
    this.filmsCardModel = filmsCardsModel;
    this.boardFilms=[...this.filmsCardModel.card];

    render(new MainNavigation, this.boardContainer);
    render(new SortView(), this.boardContainer);
    render(this.#mainBoard, this.boardContainer);
    render(this.#filmsContainer, this.#mainBoard.element);
    render(new ButtonShowMoreView(), this.#filmsContainer.element);
    this.boardFilms.forEach((card) => this.#renderCard(card));
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
}
