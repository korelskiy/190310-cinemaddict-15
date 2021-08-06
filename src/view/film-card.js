import {timeConvert, getFormatData, createElement} from '../utils.js';

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

export default class FilmCard {
  constructor(film) {
    this._film = film;
    this._element = null;
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
