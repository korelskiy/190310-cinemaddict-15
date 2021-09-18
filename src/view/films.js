import AbstractView from './abstract.js';

const createSiteFilmsTemplate = () =>  (
  `<section class="films">
</section>`
);
export default class Films extends AbstractView {
  getTemplate() {
    return  createSiteFilmsTemplate();
  }
}
