import AbstractView from '../framework/view/abstract-view.js';

const createUserTitleTemplate = () => '<section class="header__profile profile">Movie Buff</section>';

export default class UserTitleView extends AbstractView {
  get template() {
    return createUserTitleTemplate();
  }
}
