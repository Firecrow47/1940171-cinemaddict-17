import MainNavigation from './view/main-navigation-view.js';
import {render} from './framework/render.js';
import MainPresenter from './presenter/board-presenter.js';
import FilmsCardModel from './model/film-card-model.js';
import {generateFilter} from './mock/filter.js';

const main = document.querySelector('.main');
const filmsCardModel = new FilmsCardModel();
const mainPresenter = new MainPresenter(main, filmsCardModel);
const filters = generateFilter(filmsCardModel.card);
const mainNavigation = new MainNavigation(filters);
render(mainNavigation, main);
mainPresenter.init();

