import AbstractView from '../framework/view/abstract-view.js';

const createFilmsContainerTemplate = () => (
  `<section class="films-list">
    <div class="films-list__container">
    </div>

  </section>`
);

export default class FilmsContainerView extends AbstractView {
  get template() {
    return createFilmsContainerTemplate();
  }
}
