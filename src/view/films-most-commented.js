import AbstractView from './abstract.js';

const createSiteFilmsMostCommentedTemplate = () =>  (
  `<section class="films-list films-list--extra">
    <h2 class="films-list__title">Most commented</h2>
  </section>`
);

export default class FilmsMostCommented extends AbstractView {
  getTemplate() {
    return  createSiteFilmsMostCommentedTemplate();
  }
}
