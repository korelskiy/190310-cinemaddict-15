import {createElement} from '../utils.js';

const createSiteFilmsContainerTopTemplate = () =>  (
  `<div class="films-list__container">
    </div>`
);

export default class FilmsContainerTop {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return  createSiteFilmsContainerTopTemplate();
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
