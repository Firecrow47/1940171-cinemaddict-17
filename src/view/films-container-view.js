import {createElement} from '../render.js';

const createFilmsContainerTemplate = () => (
  `<section class="films-list">
    <div class="films-list__container">
    </div>

  </section>`
);

export default class FilmsContainerView {
  getTemplate() {
    return createFilmsContainerTemplate();
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
