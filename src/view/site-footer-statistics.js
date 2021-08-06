import {createElement} from '../utils.js';

const createStatisticsFooterTemplate = (filmCount) =>  (
  `<p>
    ${filmCount} movies inside
  </p>`
);

export default class StatisticsFooter {
  constructor(filmCount) {
    this._filmCount = filmCount;
    this._element = null;
  }

  getTemplate() {
    return createStatisticsFooterTemplate(this._filmCount);
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
