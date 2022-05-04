import {generateCard} from '../mock/film_card.js';

export default class FilmsCardModel {
  tasks = Array.from({length: 5}, generateCard);

  getTasks = () => this.tasks;
}
