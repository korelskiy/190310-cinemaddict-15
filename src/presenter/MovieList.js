import MoviePresenter from './movie.js';
import UserProfileView from '../view/user-profile.js';
import FilmsFiltersView from '../view/site-filters.js';
import MoreButtonView from '../view/show-more-button.js';
import FilmsMostCommentedView from '../view/site-films-most.js';
import FilmsContainerMostCommentedView from '../view/site-films-container-most.js';
import FilmsTopView from '../view/site-films-top.js';
import FilmsContainerTopView from '../view/site-films-container-top.js';
import FilmsView from '../view/site-films.js';
import FilmsListView from '../view/site-films-list.js';
import FilmsListContainerView from '../view/site-films-list-container.js';
import FilmsSortView from '../view/site-sort.js';
import StatisticsView from '../view/statistics.js';
import StatisticsFooterView from '../view/site-footer-statistics.js';

import NoFilmsView from '../view/no-films.js';

import {render, RenderPosition, remove} from '../utils/render.js';
import {updateItem} from '../utils/common.js';


const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

export default class Movie {
  constructor() {
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._renderedFilmsExtraCount = EXTRA_FILMS_COUNT;
    this._filmPresenter = new Map();

    this._userProfileComponent = new UserProfileView();
    this._filmsFiltersComponent = new FilmsFiltersView();
    this._filmsSortComponent = new FilmsSortView();
    this._noFilmsComponent = new NoFilmsView();
    this._statisticsFooterComponent = new StatisticsFooterView();
    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._filmsTopComponent = new FilmsTopView();
    this._filmsMostCommentedComponent = new FilmsMostCommentedView();
    this._filmsContainerMostCommentedComponent = new FilmsContainerMostCommentedView();
    this._filmsContainerTopComponent = new FilmsContainerTopView();
    this._loadMoreButtonComponent = new MoreButtonView();
    this._statisticsComponent = new StatisticsView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    render(siteMainElement, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);

    this._renderProfile();
    //this._renderFilters();
    this._renderFilmsPanel();
    this._renderStatisticsFooter();
    //this._renderStatistics();
  }

  _handleFilmChange(updatedFilm) {
    console.log(updatedFilm);
    this._films = updateItem(this._films, updatedFilm);
    this._filmPresenter.get(updatedFilm.id).init(updatedFilm);
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
    render(siteMainElement, this._filmsSortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderFilm(filmListContainer, film) {
    const moviePresenter = new MoviePresenter(filmListContainer, this._handleFilmChange);
    moviePresenter.init(film);
    this._filmPresenter.set(film.id, moviePresenter);
  }

  _renderFilms(filmListContainer, from, to) {
    this._films
      .slice(from, to)
      .forEach((film) => this._renderFilm(filmListContainer, film));
  }

  _renderNoFilm() {
    render(this._filmsListComponent, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleLoadMoreButtonClick() {
    this._renderFilms(this._filmsListContainerComponent, this._renderedFilmsCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP);
    this._renderedFilmsCount += FILMS_COUNT_PER_STEP;
    if (this._renderedFilmsCount >= this._films.length) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderMoreButton() {
    render(this._filmsListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _clearFilmList() {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    remove(this._loadMoreButtonComponent);
  }

  _renderFilmList() {
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilms(this._filmsListContainerComponent, 0, Math.min(this._films.length, FILMS_COUNT_PER_STEP));

    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderMoreButton();
    }
  }

  _renderFilmTop() {
    render(this._filmsComponent, this._filmsTopComponent, RenderPosition.BEFOREEND);
    render(this._filmsTopComponent, this._filmsContainerTopComponent, RenderPosition.BEFOREEND);
    this._renderFilms(this._filmsContainerTopComponent, 0, this._renderedFilmsExtraCount);
  }

  _renderFilmMostCommented() {
    render(this._filmsComponent, this._filmsMostCommentedComponent, RenderPosition.BEFOREEND);
    render(this._filmsMostCommentedComponent, this._filmsContainerMostCommentedComponent, RenderPosition.BEFOREEND);
    this._renderFilms(this._filmsContainerMostCommentedComponent, 0, this._renderedFilmsExtraCount);
  }

  _renderFilmsPanel() {
    if (this._films.length === 0) {
      this._renderNoFilm();
      return;
    }

    this._renderSort();
    this._renderFilmList();
    this._renderFilmTop();
    this._renderFilmMostCommented();
  }

  _renderStatisticsFooter() {
    render(siteFooterStatisticsElement, this._statisticsFooterComponent, RenderPosition.BEFOREEND);
  }

  _renderStatistics() {
    render(siteMainElement, this._statisticsComponent, RenderPosition.BEFOREEND);
  }
}
