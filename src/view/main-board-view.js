import AbstractView from '../framework/view/abstract-view.js';

const createBoardFilmsTemplate = () => '<section class="films"></section>';

export default class MainBoardView extends AbstractView {
  get template() {
    return createBoardFilmsTemplate();
  }
}
