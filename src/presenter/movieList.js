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
import {render, RenderPosition, remove} from '../utils/render.js';
import {sortFilmUp, sortFilmRating} from '../utils/film.js';
import {SortType, UpdateType, UserAction} from '../const.js';

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

const siteMainElement = document.querySelector('.main');

export default class Movie {
  constructor(filmsModel) {
    this._filmsModel = filmsModel;
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._renderedFilmsExtraCount = EXTRA_FILMS_COUNT;
    this._currentSortType = SortType.DEFAULT;
    this._filmPresenter = new Map();
    this._filmTopPresenter = new Map();
    this._filmCommentedPresenter = new Map();
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
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._filmsModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilmsPanel();
  }

  _getFilms() {
    switch (this._currentSortType) {
      case SortType.DATE:
        return (this._filmsModel.getFilms().slice().sort(sortFilmUp));
      case SortType.RATING:
        return this._filmsModel.getFilms().slice().sort(sortFilmRating);
    }
    return this._filmsModel.getFilms();
  }

  _handleModeChange() {
    this._filmPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this._filmsModel.updateFilm(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._filmsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._filmsModel.deleteComment(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        break;
      case UpdateType.MINOR:
        if (this._filmPresenter.get(data.id)) {
          this._filmPresenter.get(data.id).init(data);
        }
        if (this._filmTopPresenter.get(data.id)) {
          this._filmTopPresenter.get(data.id).init(data);
        }
        if (this._filmCommentedPresenter.get(data.id)) {
          this._filmCommentedPresenter.get(data.id).init(data);
        }
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearFilmList();
    this._renderFilmsPanel();
  }

  _renderSort() {
    render(siteMainElement, this._filmsSortComponent, RenderPosition.BEFOREEND);
    this._filmsSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderFilm(filmListContainer, film) {
    const moviePresenter = new MoviePresenter(filmListContainer, this._handleViewAction, this._handleModeChange);
    moviePresenter.init(film);
    this._filmPresenter.set(film.id, moviePresenter);
  }

  _renderTopFilm(filmListContainer, film) {
    const moviePresenter = new MoviePresenter(filmListContainer, this._handleViewAction, this._handleModeChange);
    moviePresenter.init(film);
    this._filmTopPresenter.set(film.id, moviePresenter);
  }

  _renderCommentedFilm(filmListContainer, film) {
    const moviePresenter = new MoviePresenter(filmListContainer, this._handleViewAction, this._handleModeChange);
    moviePresenter.init(film);
    this._filmCommentedPresenter.set(film.id, moviePresenter);
  }

  _renderFilms(filmListContainer, films) {
    films.forEach((film) => this._renderFilm(filmListContainer, film));
  }

  _renderNoFilm() {
    render(siteMainElement, this._noFilmsComponent, RenderPosition.BEFOREEND);
  }

  _handleLoadMoreButtonClick() {
    const filmCount = this._getFilms().length;
    const newRenderedFilmCount = Math.min(filmCount, this._renderedFilmsCount + FILMS_COUNT_PER_STEP);
    const films = this._getFilms().slice(this._renderedFilmsCount,  newRenderedFilmCount);
    this._renderFilms(this._filmsListContainerComponent, films);
    this._renderedFilmsCount = newRenderedFilmCount;
    if (this._renderedFilmsCount >= filmCount) {
      remove(this._loadMoreButtonComponent);
    }
  }

  _renderMoreButton() {
    render(this._filmsListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
  }

  _clearFilmList() {
    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmTopPresenter.forEach((presenter) => presenter.destroy());
    this._filmCommentedPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    remove(this._loadMoreButtonComponent);
  }

  _renderFilmList() {
    const filmCount = this._getFilms().length;
    const films = this._getFilms().slice(0, Math.min(filmCount, FILMS_COUNT_PER_STEP));
    this._renderFilms(this._filmsListContainerComponent, films);
    if (filmCount > FILMS_COUNT_PER_STEP) {
      this._renderMoreButton();
    }
  }

  _renderFilmTop() {
    render(this._filmsComponent, this._filmsTopComponent, RenderPosition.BEFOREEND);
    render(this._filmsTopComponent, this._filmsContainerTopComponent, RenderPosition.BEFOREEND);
    const topRatedFilms = this._getFilms().slice().sort((second, first) => first.totalRating - second.totalRating);
    topRatedFilms.slice(0, this._renderedFilmsExtraCount).forEach((film) => this._renderTopFilm(this._filmsContainerTopComponent, film));
  }

  _renderFilmMostCommented() {
    render(this._filmsComponent, this._filmsMostCommentedComponent, RenderPosition.BEFOREEND);
    render(this._filmsMostCommentedComponent, this._filmsContainerMostCommentedComponent, RenderPosition.BEFOREEND);
    const mostCommentedFilms = this._getFilms().slice().sort((second, first) => first.comments.length - second.comments.length);
    mostCommentedFilms.slice(0, this._renderedFilmsExtraCount).forEach((film) => this._renderCommentedFilm(this._filmsContainerMostCommentedComponent, film));
  }

  _renderFilmsPanel() {
    if (this._getFilms().length === 0) {
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
