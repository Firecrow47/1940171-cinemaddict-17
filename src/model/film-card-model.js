import { generateCard } from '../mock/film-card.js';

export default class FilmsCardModel {

  #card = Array.from({length:20}, generateCard);

  get card () {
    return this.#card;
  }
}
