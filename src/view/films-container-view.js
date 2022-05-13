import {createElement} from '../render.js';

const createFilmsContainerTemplate = () => (
  `<section class="films-list">
    <div class="films-list__container">
    </div>

  </section>`
);

export default class FilmsContainerView {
  #element = null;

  get template() {
    return createFilmsContainerTemplate();
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
