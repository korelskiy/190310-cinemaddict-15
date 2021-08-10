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
//import StatisticsView from './view/statistics.js';
import StatisticsFooterView from './view/site-footer-statistics.js';
import FilmCardView from './view/film-card.js';
import FilmDetailsView from './view/film-details.js';
import NoFilmsView from './view/no-films.js';

import {generateFilms} from './mock/film.js';
import {generateFilter, generateTopFilms, generateMostCommentedFilms} from './mock/filter.js';
import {render, RenderPosition, remove} from './utils/render.js';

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

  const renderCardFilmDetails = () => {
    render(body, filmDetailsComponent, RenderPosition.BEFOREEND);
    body.classList.add('hide-overflow');
  };

  const renderCardFilm = () => {
    remove(filmDetailsComponent);
    body.classList.remove('hide-overflow');
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      renderCardFilm();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  filmComponent.setPosterClickHandler(() => {
    renderCardFilmDetails();
    document.addEventListener('keydown', onEscKeyDown);
  });

  filmComponent.setTitleClickHandler(() => {
    renderCardFilmDetails();
    document.addEventListener('keydown', onEscKeyDown);
  });

  filmComponent.setCommentsClickHandler(() => {
    renderCardFilmDetails();
    document.addEventListener('keydown', onEscKeyDown);
  });

  filmDetailsComponent.setCloseButtonClickHandler(() => {
    renderCardFilm();
    document.removeEventListener('keydown', onEscKeyDown);
  });
  render(filmsListElement, filmComponent, RenderPosition.BEFOREEND);
};

const renderFilmsPanel = () =>  {
  render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
  render(siteMainElement, new FilmsFiltersView(filters), RenderPosition.BEFOREEND);
  render(siteMainElement, new FilmsSortView(), RenderPosition.BEFOREEND);

  const filmsComponent = new FilmsView();
  render(siteMainElement, filmsComponent, RenderPosition.BEFOREEND);

  const filmsListComponent = new FilmsListView();
  render(filmsComponent, filmsListComponent, RenderPosition.BEFOREEND);

  const filmsListContainer = new FilmsListContainerView();

  if (films.length === 0) {
    render(filmsListComponent, new NoFilmsView(), RenderPosition.BEFOREEND);
  } else {
    render(filmsListComponent, filmsListContainer, RenderPosition.BEFOREEND);

    for (let i = 0; i < Math.min(films.length, FILMS_COUNT_PER_STEP); i++) {
      renderFilms(filmsListContainer, films[i]);
    }

    if (films.length > FILMS_COUNT_PER_STEP) {

      let renderedFilmCount = FILMS_COUNT_PER_STEP;
      const showMoreButton = new MoreButtonView();

      render(filmsListComponent, showMoreButton, RenderPosition.BEFOREEND);

      showMoreButton.setClickHandler(() => {
        films
          .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
          .forEach((film) => renderFilms(filmsListContainer, film));
        renderedFilmCount += FILMS_COUNT_PER_STEP;

        if (renderedFilmCount >= films.length) {
          remove(showMoreButton);
        }
      });
    }

    const filmsTopComponent = new FilmsTopView();
    render(filmsComponent, filmsTopComponent, RenderPosition.BEFOREEND);

    const filmsTopContainer = new FilmsContainerTopView();
    render(filmsTopComponent, filmsTopContainer, RenderPosition.BEFOREEND);

    for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
      renderFilms(filmsTopContainer, topRatedFilms[i]);
    }

    const filmsMostCommentedComponent = new FilmsMostCommentedView();
    render(filmsComponent, filmsMostCommentedComponent, RenderPosition.BEFOREEND);

    const filmsMostCommentedContainer = new FilmsContainerMostCommentedView();
    render(filmsMostCommentedComponent, filmsMostCommentedContainer, RenderPosition.BEFOREEND);

    for (let i = 0; i < EXTRA_FILMS_COUNT; i++) {
      renderFilms(filmsMostCommentedContainer, mostCommentedFilms[i]);
    }
  }
};

/* Временно скрыл отрисовку страницы статистики
render(siteMainElement, new StatisticsView().getElement(), RenderPosition.BEFOREEND);
*/

renderFilmsPanel();
render(siteFooterStatisticsElement, new StatisticsFooterView(films.length), RenderPosition.BEFOREEND);


