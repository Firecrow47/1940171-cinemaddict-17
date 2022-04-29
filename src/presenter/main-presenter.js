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
  mainBoard = new MainBoardView();
  filmsContainer = new FilmsContainerView;
  init = (boardContainer) => {
    this.boardContainer = boardContainer;
    render(new MainNavigation, this.boardContainer);
    render(new SortView(), this.boardContainer);
    render(this.mainBoard,this.boardContainer);
    render(this.filmsContainer, this.mainBoard.getElement());
    render(new ButtonShowMoreView(),this.filmsContainer.getElement());
    render(new PopupHideOverflowView(),body);

    for (let i = 0; i < 5; i++) {
      render(new FilmCardView(), this.filmsContainer.getElement().querySelector('.films-list__container'));
    }
  };
}
