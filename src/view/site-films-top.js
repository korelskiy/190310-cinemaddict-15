import AbstractView from './abstract.js';

const createSiteFilmsTopTemplate = () =>  (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Top rated</h2>
  </section>`
);
export default class FilmsTop extends AbstractView {
  getTemplate() {
    return  createSiteFilmsTopTemplate();
  }
}
