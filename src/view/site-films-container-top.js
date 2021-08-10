import AbstractView from './abstract.js';

const createSiteFilmsContainerTopTemplate = () =>  (
  `<div class="films-list__container">
    </div>`
);
export default class FilmsContainerTop extends AbstractView{
  getTemplate() {
    return  createSiteFilmsContainerTopTemplate();
  }
}
