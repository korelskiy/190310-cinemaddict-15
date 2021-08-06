import {createElement} from '../utils.js';

const createSiteFilmsMostCommentedTemplate = () =>  (
  `<div class="films-list__container">
    </div>`
);

export default class FilmsContainerMostCommented {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return  createSiteFilmsMostCommentedTemplate();
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
