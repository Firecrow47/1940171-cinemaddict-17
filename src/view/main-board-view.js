import {createElement} from '../render.js';

const createBoardFilmsTemplate = () => '<section class="films"></section>';

export default class MainBoardView {
  getTemplate() {
    return createBoardFilmsTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
