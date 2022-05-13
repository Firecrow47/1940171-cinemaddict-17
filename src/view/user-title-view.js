import {createElement} from '../render.js';

const createUserTitleTemplate = () => '<section class="header__profile profile">Movie Buff</section>';

export default class UserTitleView {
  #element = null;

  get template() {
    return createUserTitleTemplate();
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
