import AbstractView from './abstract.js';
import {timeConvert, getFormatData} from '../utils/film.js';

const MAX_COUNT_DESCRIPTION = 140;

const createFilmCardTemplate = (film) =>  {
  const {title, totalRating, genre, description, release, runtime, poster, userDetails} = film.filmInfo;

  const createDescriptionText = (descriptionText) => {
    if (descriptionText.length < MAX_COUNT_DESCRIPTION) {
      return descriptionText;
    }
    return `${descriptionText.slice(0, MAX_COUNT_DESCRIPTION - 3)}...`;
  };

  const releaseDate = getFormatData(release.date, 'YYYY');

  const getClassNameActiveControl = (cardControl) => cardControl
    ? 'film-card__controls-item--active'
    : '';

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${releaseDate}</span>
      <span class="film-card__duration">${timeConvert(runtime)}</span>
      <span class="film-card__genre">${genre[0]}</span>
    </p>
    <img src="./images/posters/${poster}"  alt="" class="film-card__poster">
    <p class="film-card__description">${createDescriptionText(description)}</p>
    <a class="film-card__comments">${film.comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${getClassNameActiveControl(userDetails.watchlist)}" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${getClassNameActiveControl(userDetails.alreadyWatched)}" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite ${getClassNameActiveControl(userDetails.favorite)}" type="button">Mark as favorite</button>
    </div>
  </article>`;
};

export default class FilmCard extends AbstractView {
  constructor(film) {
    super();
    this._film = film;
    this._posterClickHandler = this._posterClickHandler.bind(this);
    this._titleClickHandler = this._titleClickHandler.bind(this);
    this._commentsClickHandler = this._commentsClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _watchlistClickHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _alreadyWatchedClickHandler(evt) {
    evt.preventDefault();
    this._callback.alreadyWatchedClick();
  }

  _favoriteClickHandler(evt) {
    evt.preventDefault();
    this._callback.favoriteClick();
  }

  _posterClickHandler(evt) {
    evt.preventDefault();
    this._callback.posterClick();
  }

  _titleClickHandler(evt) {
    evt.preventDefault();
    this._callback.titleClick();
  }

  _commentsClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentsClick();
  }

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setAlreadyWatchedHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement().querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this._alreadyWatchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-card__controls-item--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  setPosterClickHandler(callback) {
    this._callback.posterClick = callback;
    this.getElement().querySelector('.film-card__poster').addEventListener('click', this._posterClickHandler);
  }

  setTitleClickHandler(callback) {
    this._callback.titleClick = callback;
    this.getElement().querySelector('.film-card__title').addEventListener('click', this._titleClickHandler);
  }

  setCommentsClickHandler(callback) {
    this._callback.commentsClick = callback;
    this.getElement().querySelector('.film-card__comments').addEventListener('click', this._commentsClickHandler);
  }
}
