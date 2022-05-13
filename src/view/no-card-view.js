import {createElement} from '../render.js';

const createNoCardTemplate = () => (
  '<h2 class="films-list__title">There are no movies in our database</h2>'
);

export default class NoCardView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNoCardTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
