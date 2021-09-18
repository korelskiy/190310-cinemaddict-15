import AbstractView from './abstract.js';

const createSiteFilmsListContainerTemplate = () =>  (
  `<div class="films-list__container">
    </div>`
);
export default class FilmsListContainer extends AbstractView{
  getTemplate() {
    return  createSiteFilmsListContainerTemplate();
  }
}
