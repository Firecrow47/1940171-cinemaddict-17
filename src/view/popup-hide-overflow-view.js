import {createElement} from '../render.js';

const createHideOverflowTemplate = () => '<section class="film-details"></section>';

export default class PopupHideOverflowView {
  getTemplate() {
    return createHideOverflowTemplate();
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
