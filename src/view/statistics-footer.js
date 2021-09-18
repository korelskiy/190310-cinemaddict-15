import AbstractView from './abstract.js';

const createStatisticsFooterTemplate = (filmCount) =>  (
  `<p>
    ${filmCount} movies inside
  </p>`
);

export default class StatisticsFooter extends AbstractView {
  constructor(filmCount) {
    super();
    this._filmCount = filmCount;
  }

  getTemplate() {
    return createStatisticsFooterTemplate(this._filmCount);
  }
}
