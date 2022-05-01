import UserTitleView from './view/user-title-view.js';
import {render} from './render.js';
import MainPresenter from './presenter/main-presenter.js';
const headerElement = document.querySelector('.header');
const main = document.querySelector('.main');

render(new UserTitleView(), headerElement);
const mainPresenter = new MainPresenter();
mainPresenter.init(main);

