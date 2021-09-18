import AbstractView from './abstract.js';

const createSiteFilmsMostCommentedTemplate = () =>  (
  `<div class="films-list__container">
    </div>`
);
export default class FilmsContainerMostCommented extends AbstractView {
  getTemplate() {
    return  createSiteFilmsMostCommentedTemplate();
  }
}
