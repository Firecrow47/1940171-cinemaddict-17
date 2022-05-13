import {createElement} from '../render.js';

const createBoardFilmsTemplate = () => '<section class="films"></section>';

export default class MainBoardView {
  #element = null;

  get template() {
    return createBoardFilmsTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
