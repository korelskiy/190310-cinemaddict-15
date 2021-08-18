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
import NoFilmsView from './view/no-films.js';

import {render, RenderPosition, remove} from './utils/render.js';

const FILMS_COUNT = 24;
const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

const body = document.querySelector('body');
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

export default class Movie {
  constructor(movieContainer) {
    this._movieContainer = movieContainer;

    this._userProfileComponent = new UserProfileView();
    this._filmsFiltersComponent = new FilmsFiltersView();
    this._filmsSortComponent = new FilmsSortView();
    this._filmCardComponent = new FilmCardView();
    this._filmDetailsComponent = new FilmDetailsView();
    this._noFilmsComponent = new NoFilmsView();
    this._statisticsFooterComponent = new StatisticsFooterView();
    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._filmsTopComponent = new FilmsTopView();
    this._filmsMostCommentedComponent = new FilmsMostCommentedView();
    this._filmsContainerMostCommentedComponent = new FilmsContainerMostCommentedView();
    this._filmsContainerTopComponent = new FilmsContainerTopView();

    /*
    this._moreButtonComponent = new MoreButtonView();

    this._statisticsComponent = new StatisticsView();
    */
  }

  init(films) {
    this._films = films.slice();
    // Метод для инициализации (начала работы) модуля,
    render(siteMainElement, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._renderFilmsPanel();
  }

  _renderProfile() {
    // Метод для рендеринга User Profile
    render(siteHeaderElement, this._userProfileComponent, RenderPosition.BEFOREEND);
  }

  _renderFilters() {
    // Метод для рендеринга фильтров
    render(siteMainElement, this._filmsFiltersComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    // Метод для рендеринга сортировки
    render(siteMainElement, this._filmsSortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(film) {
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
    render(this._filmsListContainerComponent, filmComponent, RenderPosition.BEFOREEND);
  }

  _renderFilms(from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(film));
  }

  _renderNoFilm() {
    render(this._filmsListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _renderMoreButton() {
    let renderedFilmCount = FILMS_COUNT_PER_STEP;
    const showMoreButton = new MoreButtonView();

    render(this._filmsListComponent, showMoreButton, RenderPosition.BEFOREEND);

    showMoreButton.setClickHandler(() => {
      this._films
        .slice(renderedFilmCount, renderedFilmCount + FILMS_COUNT_PER_STEP)
        .forEach((film) => this._renderFilm(film));

      renderedFilmCount += FILMS_COUNT_PER_STEP;

      if (renderedFilmCount >= this._films.length) {
        remove(showMoreButton);
      }
    });
  }

  _renderFilmList() {
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilms(0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));

    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderMoreButton();
    }
  }

  _renderFilmTop() {
    render(this._filmsComponent, this._filmsTopComponent, RenderPosition.BEFOREEND);
    render(this._filmsTopComponent, this._filmsContainerTopComponent, RenderPosition.BEFOREEND);
    this._renderFilms(0, EXTRA_FILMS_COUNT);
  }

  _renderFilmMostCommented() {
    render(this._filmsComponent, this._filmsMostCommentedComponent, RenderPosition.BEFOREEND);
    render(this._filmsMostCommentedComponent, this._filmsContainerMostCommentedComponent, RenderPosition.BEFOREEND);
    this._renderFilms(0, EXTRA_FILMS_COUNT);
  }

  _renderFilmsPanel() {
    if (this._films.length === 0) {
      this._renderNoFilm();
      return;
    }

    this._renderProfile();
    this._renderFilters();
    this._renderSort();
    this._renderFilmList();
  }

  _renderStatisticsFooter() {
    // Метод для рендеринга статистики в Footer
    render(siteFooterStatisticsElement, this._statisticsFooterComponent, RenderPosition.BEFOREEND);
  }
}
