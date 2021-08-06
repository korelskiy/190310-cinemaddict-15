import UserProfileView from './view/user-profile.js';
import FilmsFiltersView from './view/site-filters.js';
import MoreButtonView from './view/show-more-button.js';
import FilmsMostCommentedView from './view/site-films-most.js';
import FilmsContainerMostCommentedView from './view/site-films-container-most.js';
import FilmsTopView from './view/site-films-top.js';
import FilmsContainerTopView from './view/site-films-container-top.js';
import FilmsView from './view/site-films.js';
import FilmsListView from './view/site-films-list.js';
import FilmsListContainerView from './view/site-films-list-container.js';
import FilmsSortView from './view/site-sort.js';
import StatisticsView from './view/statistics.js';
import StatisticsFooterView from './view/site-footer-statistics.js';
import FilmCardView from './view/film-card.js';
import FilmDetailsView from './view/film-details.js';

import {generateFilms} from './mock/film.js';
import {generateFilter, generateTopFilms, generateMostCommentedFilms} from './mock/filter.js';
import {render, RenderPosition} from './utils.js';

const FILMS_COUNT = 24;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

const films = generateFilms(FILMS_COUNT);
const filters = generateFilter(films);
const topRatedFilms = generateTopFilms(films);
const mostCommentedFilms = generateMostCommentedFilms(films);

const body = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

const renderFilms = (filmsListElement, film) => {
  const filmComponent = new FilmCardView(film);
  const filmDetailsComponent = new FilmDetailsView(film);

  const replaceFilmToDetailsFilm = () => {
    body.appendChild(filmDetailsComponent.getElement());
    body.classList.add('hide-overflow');
  };

  const replaceDetailsFilmToFilm = () => {
    body.removeChild(filmDetailsComponent.getElement());
    body.classList.remove('hide-overflow');
  };

  filmComponent.getElement().querySelector('.film-card__poster').addEventListener('click', () => {
    replaceFilmToDetailsFilm();
  });
  filmComponent.getElement().querySelector('.film-card__title').addEventListener('click', () => {
    replaceFilmToDetailsFilm();
  });
  filmComponent.getElement().querySelector('.film-card__comments').addEventListener('click', () => {
    replaceFilmToDetailsFilm();
  });

  filmDetailsComponent.getElement().querySelector('.film-details__close-btn').addEventListener('click', (evt) => {
    evt.preventDefault();
    replaceDetailsFilmToFilm();
  });
  render(filmsListElement, filmComponent.getElement(), RenderPosition.BEFOREEND);
};

render(siteHeaderElement, new UserProfileView().getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsFiltersView(filters).getElement(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsSortView().getElement(), RenderPosition.BEFOREEND);

const filmsComponent = new FilmsView();
render(siteMainElement, filmsComponent.getElement(), RenderPosition.BEFOREEND);

const filmsListComponent = new FilmsListView();
render(filmsComponent.getElement(), filmsListComponent.getElement(), RenderPosition.BEFOREEND);

const filmsListContainer = new FilmsListContainerView();
render(filmsListComponent.getElement(), filmsListContainer.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
  renderFilms(filmsListContainer.getElement(), films[i]);
}

if (films.length > FILMS_COUNT_PER_STEP) {

  let renderedFilmCount = FILMS_COUNT_PER_STEP;
  const showMoreButton = new MoreButtonView();

  render(filmsListComponent.getElement(), showMoreButton.getElement(), RenderPosition.BEFOREEND);

  showMoreButton.getElement().addEventListener('click', (evt) => {
    evt.preventDefault();
    films
      .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
      .forEach((film) => renderFilms(filmsListContainer.getElement(), film));
    renderedFilmCount += FILMS_COUNT_PER_STEP;

    if (renderedFilmCount >= films.length) {
      showMoreButton.getElement().remove();
      showMoreButton.removeElement();
    }
  });
}

const filmsTopComponent = new FilmsTopView();
render(filmsComponent.getElement(), filmsTopComponent.getElement(), RenderPosition.BEFOREEND);

const filmsTopContainer = new FilmsContainerTopView();
render(filmsTopComponent.getElement(), filmsTopContainer.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  renderFilms(filmsTopContainer.getElement(), topRatedFilms[i]);
}

const filmsMostCommentedComponent = new FilmsMostCommentedView();
render(filmsComponent.getElement(), filmsMostCommentedComponent.getElement(), RenderPosition.BEFOREEND);

const filmsMostCommentedContainer = new FilmsContainerMostCommentedView();
render(filmsMostCommentedComponent.getElement(), filmsMostCommentedContainer.getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
  renderFilms(filmsMostCommentedContainer.getElement(), mostCommentedFilms[i]);
}

render(siteMainElement, new StatisticsView().getElement(), RenderPosition.BEFOREEND);
render(siteFooterStatisticsElement, new StatisticsFooterView(films.length).getElement(), RenderPosition.BEFOREEND);

