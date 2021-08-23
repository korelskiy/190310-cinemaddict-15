import MoviePresenter from './movie.js';
import MoreButtonView from '../view/show-more-button.js';
import FilmsMostCommentedView from '../view/site-films-most.js';
import FilmsContainerMostCommentedView from '../view/site-films-container-most.js';
import FilmsTopView from '../view/site-films-top.js';
import FilmsContainerTopView from '../view/site-films-container-top.js';
import FilmsView from '../view/site-films.js';
import FilmsListView from '../view/site-films-list.js';
import FilmsListContainerView from '../view/site-films-list-container.js';
import FilmsSortView from '../view/site-sort.js';
import NoFilmsView from '../view/no-films.js';

import {generateTopFilms, generateMostCommentedFilms} from '../mock/filter.js';
import {render, RenderPosition, remove} from '../utils/render.js';
import {updateItem} from '../utils/common.js';
import {sortFilmUp, sortFilmRating} from '../utils/film.js';
import {SortType} from '../const.js';

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

const siteMainElement = document.querySelector('.main');

export default class Movie {
  constructor() {
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._renderedFilmsExtraCount = EXTRA_FILMS_COUNT;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = new Map();
    this._filmsSortComponent = new FilmsSortView();
    this._noFilmsComponent = new NoFilmsView();
    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._filmsTopComponent = new FilmsTopView();
    this._filmsMostCommentedComponent = new FilmsMostCommentedView();
    this._filmsContainerMostCommentedComponent = new FilmsContainerMostCommentedView();
    this._filmsContainerTopComponent = new FilmsContainerTopView();
    this._loadMoreButtonComponent = new MoreButtonView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleFilmChange = this._handleFilmChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(films) {
    this._films = films.slice();
    this._sourcedFilmList = films.slice();
    this._topRatedFilms = generateTopFilms(films);
    this._mostCommentedFilms = generateMostCommentedFilms(films);
    this._renderFilmsPanel();
  }

  _handleModeChange() {
    this._filmPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleFilmChange(updatedFilm) {
    this._films = updateItem(this._films, updatedFilm);
    this._sourcedFilmList = updateItem(this._sourcedFilmList, updatedFilm);
    this._filmPresenter.get(updatedFilm.id).init(updatedFilm);
  }

  _sortFilms(sortType) {
    switch (sortType) {
      case SortType.DATE:
        this._films.sort(sortFilmUp);
        break;
      case SortType.RATING:
        this._films.sort(sortFilmRating);
        break;
      default:
        this._films = this._sourcedFilmList.slice();
    }
    this._currentSortType = sortType;
  }


  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortFilms(sortType);
    this._clearFilmList();
    this._renderFilmList();
  }

  _renderSort() {
    render(siteMainElement, this._filmsSortComponent, RenderPosition.BEFOREEND);
    this._filmsSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(filmListContainer, film) {
    const moviePresenter = new MoviePresenter(filmListContainer, this._handleFilmChange, this._handleModeChange);
    moviePresenter.init(film);
    this._filmPresenter.set(film.id, moviePresenter);
  }

  _renderFilms(filmListContainer, from, to, films) {
    films
      .slice(from, to)
      .forEach((film) => this._renderFilm(filmListContainer, film));
  }

  _renderNoFilm() {
    render(siteMainElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleLoadMoreButtonClick() {
    this._renderFilms(this._filmsListContainerComponent, this._renderedFilmsCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP, this._films);
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
    this._renderFilms(this._filmsListContainerComponent, 0, Math.min(this._films.length, FILMS_COUNT_PER_STEP), this._films);

    if (this._films.length > FILMS_COUNT_PER_STEP) {
      this._renderMoreButton();
    }
  }

  _renderFilmTop() {
    render(this._filmsComponent, this._filmsTopComponent, RenderPosition.BEFOREEND);
    render(this._filmsTopComponent, this._filmsContainerTopComponent, RenderPosition.BEFOREEND);
    this._renderFilms(this._filmsContainerTopComponent, 0, this._renderedFilmsExtraCount, this._topRatedFilms);
  }

  _renderFilmMostCommented() {
    render(this._filmsComponent, this._filmsMostCommentedComponent, RenderPosition.BEFOREEND);
    render(this._filmsMostCommentedComponent, this._filmsContainerMostCommentedComponent, RenderPosition.BEFOREEND);
    this._renderFilms(this._filmsContainerMostCommentedComponent, 0, this._renderedFilmsExtraCount, this._mostCommentedFilms);
  }

  _renderFilmsPanel() {
    if (this._films.length === 0) {
      this._renderNoFilm();
      return;
    }
    this._renderSort();
    render(siteMainElement, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);
    this._renderFilmList();
    this._renderFilmTop();
    this._renderFilmMostCommented();
  }
}
