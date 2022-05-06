import { generateCard } from '../mock/film_card.js';

export default class FilmsCardModel {
  card = Array.from({length:5}, generateCard);

  getCard = () => this.card;
}
