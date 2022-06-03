import AbstractView from '../framework/view/abstract-view.js';

const createMainNavigationTemplate = (filter) => (
  `<nav class="main-navigation">
<a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
<a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filter[1].count}</span></a>
<a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filter[2].count}</span></a>
<a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filter[3].count}</span></a>
</nav>`);

export default class MainNavigation extends AbstractView {
  #filters = null;

  constructor(filters) {
    super();
    this.#filters = filters;
  }

  get template() {
    return createMainNavigationTemplate(this.#filters);
  }
}
