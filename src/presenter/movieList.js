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
import {filter} from '../utils/filter.js';

const FILMS_COUNT_PER_STEP = 5;
const EXTRA_FILMS_COUNT = 2;

const siteMainElement = document.querySelector('.main');

export default class Movie {
  constructor(filmsModel, filterModel) {
    this._filmsModel = filmsModel;
    this._filterModel = filterModel;
    this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    this._renderedFilmsExtraCount = EXTRA_FILMS_COUNT;
    this._currentSortType = SortType.DEFAULT;
    this._filmsSortComponent = null;
    this._loadMoreButtonComponent = null;
    this._filmPresenter = new Map();
    this._filmTopPresenter = new Map();
    this._filmCommentedPresenter = new Map();
    this._noFilmsComponent = new NoFilmsView();
    this._filmsComponent = new FilmsView();
    this._filmsListComponent = new FilmsListView();
    this._filmsListContainerComponent = new FilmsListContainerView();
    this._filmsTopComponent = new FilmsTopView();
    this._filmsMostCommentedComponent = new FilmsMostCommentedView();
    this._filmsContainerMostCommentedComponent = new FilmsContainerMostCommentedView();
    this._filmsContainerTopComponent = new FilmsContainerTopView();

    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._filmsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderFilmsPanel();
  }

  _getFilms() {
    const filterType = this._filterModel.getFilter();
    const films = this._filmsModel.getFilms().slice();
    const filtredFilms = filter[filterType](films);

    switch (this._currentSortType) {
      case SortType.DATE:
        return filtredFilms.sort(sortFilmUp);
      case SortType.RATING:
        return filtredFilms.sort(sortFilmRating);
    }
    return filtredFilms;
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
        //this._clearFilmsPanel();
        //this._renderFilmsPanel();
        break;
      case UpdateType.MAJOR:
        this._clearFilmsPanel({resetRenderedFilmCount: true, resetSortType: true});
        this._renderFilmsPanel();
        break;
    }
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this._clearFilmsPanel({resetRenderedFilmCount: true});
    this._renderFilmsPanel();
  }

  _renderSort() {
    if (this._filmsSortComponent !== null) {
      this._filmsSortComponent = null;
    }

    this._filmsSortComponent = new FilmsSortView(this._currentSortType);
    this._filmsSortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(siteMainElement, this._filmsSortComponent, RenderPosition.BEFOREEND);
  }

  _renderFilm(filmListContainer, film) {
    const moviePresenter = new MoviePresenter(filmListContainer, this._handleViewAction, this._handleModeChange, this._filmsModel);
    moviePresenter.init(film);
    this._filmPresenter.set(film.id, moviePresenter);
  }

  _renderTopFilm(filmListContainer, film) {
    const moviePresenter = new MoviePresenter(filmListContainer, this._handleViewAction, this._handleModeChange, this._filmsModel);
    moviePresenter.init(film);
    this._filmTopPresenter.set(film.id, moviePresenter);
  }

  _renderCommentedFilm(filmListContainer, film) {
    const moviePresenter = new MoviePresenter(filmListContainer, this._handleViewAction, this._handleModeChange, this._filmsModel);
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
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }
    this._loadMoreButtonComponent = new MoreButtonView();
    this._loadMoreButtonComponent.setClickHandler(this._handleLoadMoreButtonClick);
    render(this._filmsListComponent, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
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

  _clearFilmsPanel({resetRenderedFilmCount = false, resetSortType = false} = {}) {
    const filmCount = this._getFilms().length;

    this._filmPresenter.forEach((presenter) => presenter.destroy());
    this._filmPresenter.clear();
    this._filmTopPresenter.forEach((presenter) => presenter.destroy());
    this._filmTopPresenter.clear();
    this._filmCommentedPresenter.forEach((presenter) => presenter.destroy());
    this._filmCommentedPresenter.clear();

    remove(this._filmsSortComponent);
    remove(this._noFilmsComponent);
    remove(this._loadMoreButtonComponent);
    remove(this._filmsComponent);

    if (resetRenderedFilmCount) {
      this._renderedFilmsCount = FILMS_COUNT_PER_STEP;
    } else {

      this._renderedFilmsCount = Math.min(filmCount, this._renderedFilmsCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }

  _renderFilmsPanel() {
    const films = this._getFilms();
    const filmsCount = films.length;

    if (filmsCount === 0) {
      this._renderNoFilm();
      return;
    }

    this._renderSort();
    render(siteMainElement, this._filmsComponent, RenderPosition.BEFOREEND);
    render(this._filmsComponent, this._filmsListComponent, RenderPosition.BEFOREEND);
    render(this._filmsListComponent, this._filmsListContainerComponent, RenderPosition.BEFOREEND);

    this._renderFilmList(films.slice(0, Math.min(filmsCount, this._renderedFilmsCount)));
    if (filmsCount > this._renderedFilmsCount) {
      this._renderMoreButton();
    }
    this._renderFilmTop();
    this._renderFilmMostCommented();
  }
}
