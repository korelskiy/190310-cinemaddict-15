import {createSiteNavigationTemplate} from './view/site-navigation.js';
import {createSiteSortTemplate} from './view/site-sort.js';
import {createUserProfileTemplate} from './view/user-profile.js';
import {createFooterStatisticsTemplate} from './view/site-footer-statistics.js';
import {createSiteFilmsTemplate} from './view/site-films.js';
import {createSiteFilmsTopTemplate} from './view/site-films-top.js';
import {createSiteFilmsMostCommentedTemplate} from './view/site-films-most.js';

import {createFilmCardTemplate} from './view/film-card.js';
import {createShowMoreButtonTemplate} from './view/show-more-button.js';
import {createFilmDetailsTemplate} from './view/film-details.js';
import {createStatisticsTemplate} from './view/statistics.js';
import {generateFilms} from './mock/film.js';
import {generateFilter, generateTopFilms, generateMostCommentedFilms} from './mock/filter.js';



const body = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');


const FILMS_COUNT = 24;
const FILMS_COUNT_PER_STEP = 5;

const EXTRA_FILMS_COUNT = 2;


const films = generateFilms(FILMS_COUNT);
const filters = generateFilter(films);
const topRatedMovies = generateTopFilms(films);
const mostCommentedMovies = generateMostCommentedFilms(films);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

render(siteHeaderElement, createUserProfileTemplate(), 'beforeend');
render(siteMainElement, createSiteNavigationTemplate(filters), 'beforeend');
render(siteMainElement, createSiteSortTemplate(), 'beforeend');
render(siteMainElement, createSiteFilmsTemplate(), 'beforeend');

const filmsList = siteMainElement.querySelector('.films-list');

const filmsListContainer = filmsList.querySelector('.films-list__container');

//const extraFilmsListContainer = siteMainElement.querySelectorAll('.films-list--extra  .films-list__container');


for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  render(filmsListContainer, createFilmCardTemplate(films[i]), 'beforeend');
}

if (films.length > FILMS_COUNT_PER_STEP) {

  let renderedFilmCount = FILMS_COUNT_PER_STEP;

  render(filmsList, createShowMoreButtonTemplate(), 'beforeend');

  const showMoreButton = filmsList.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => render(filmsListContainer, createFilmCardTemplate(film), 'beforeend'));

    renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButton.remove();
    }
  });
}

const filmsContainer = siteMainElement.querySelector('.films');

render(filmsContainer, createSiteFilmsTopTemplate(), 'beforeend');
render(filmsContainer, createSiteFilmsMostCommentedTemplate(), 'beforeend');


const filmsListTop =  siteMainElement.querySelector('.films-list__container--top');
const filmsListMostCommented =  siteMainElement.querySelector('.films-list__container--most-commented');


for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(filmsListTop, createFilmCardTemplate(topRatedMovies[i]), 'beforeend');
}

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  render(filmsListMostCommented, createFilmCardTemplate(mostCommentedMovies[i]), 'beforeend');
}


render(siteMainElement, createStatisticsTemplate(), 'beforeend');
render(siteFooterStatisticsElement, createFooterStatisticsTemplate(), 'beforeend');
//render(body, createFilmDetailsTemplate(films[0]), 'beforeend');

