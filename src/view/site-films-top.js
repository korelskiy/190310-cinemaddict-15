import {createElement} from '../utils.js';

const createSiteFilmsTopTemplate = () =>  (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
  </section>`
);

export default class FilmsTop {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return  createSiteFilmsTopTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
