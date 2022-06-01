import UserTitleView from './view/user-title-view.js';
import {render} from './framework/render.js';
import MainPresenter from './presenter/board-presenter.js';
import FilmsCardModel from './model/film-card-model.js';

const headerElement = document.querySelector('.header');
const main = document.querySelector('.main');
const filmsCardModel = new FilmsCardModel();


render(new UserTitleView(), headerElement);
const mainPresenter = new MainPresenter(main, filmsCardModel);
mainPresenter.init();

