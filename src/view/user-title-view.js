import {createElement} from '../render.js';

const createUserTitleTemplate = () => '<section class="header__profile profile">Movie Buff</section>';

export default class UserTitleView {
  getTemplate() {
    return createUserTitleTemplate();
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
