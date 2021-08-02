import {createSiteNavigationTemplate} from './view/site-navigation.js';
import {createSiteSortTemplate} from './view/site-sort.js';
import {createUserProfileTemplate} from './view/user-profile.js';
import {createFooterStatisticsTemplate} from './view/site-footer-statistics.js';
import {createSiteFilmsTemplate} from './view/site-films.js';
import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createFilmDetailsTemplate} from './view/film-details.js';
import {createStatisticsTemplate} from './view/statistics.js';
import {generateFilm} from './mock/film.js';

const body = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const FILMS_COUNT = 5;
const EXTRA_FILMS_COUNT = 2;

const films = new Array(FILMS_COUNT).fill().map(generateFilm);
console.log(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createUserProfileTemplate(), 'beforeend');
render(siteMainElement, createSiteNavigationTemplate(), 'beforeend');
render(siteMainElement, createSiteSortTemplate(), 'beforeend');
render(siteMainElement, createSiteFilmsTemplate(), 'beforeend');

const filmsList = siteMainElement.querySelector('.films-list');
const filmsListContainer = filmsList.querySelector('.films-list__container');
const extraFilmsListContainer = siteMainElement.querySelectorAll('.films-list--extra  .films-list__container');

for (let i = 0; i < FILMS_COUNT; i++) {
  render(filmsListContainer, createFilmCardTemplate(films[i]), 'beforeend');
}

render(filmsList, createShowMoreButtonTemplate(), 'beforeend');

extraFilmsListContainer.forEach((container) => {
  for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
    render(container, createFilmCardTemplate(), 'beforeend');
  }
});

render(siteMainElement, createStatisticsTemplate(), 'beforeend');
render(siteFooterStatisticsElement, createFooterStatisticsTemplate(), 'beforeend');
//render(body, createFilmDetailsTemplate(), 'beforeend');
