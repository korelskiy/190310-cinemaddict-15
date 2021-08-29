//import AbstractView from './abstract.js';
import SmartView from './smart.js';
import {timeConvert, getFormatData} from '../utils/film.js';

const createFilmDetailsTemplate = (data) =>  {
  const {title, alternativeTitle, totalRating, director, writers, actors, genre, description, release, runtime, poster, watchlist, ageRating, alreadyWatched, favorite, isEmoji, emojiName, isComments} = data;

  const releaseDate = getFormatData(release.date, 'DD MMMM YYYY');

  const getTemplateGenres = (genresFilm) => {
    const getGenresFilmElement = (genreData) => `<span class="film-details__genre">${genreData}</span>`;
    return genresFilm.map(getGenresFilmElement).join('');
  };

  const getClassNameActiveControl = (cardControl) => cardControl
    ? 'film-details__control-button--active'
    : '';

  const getTemplateComments = (commentsFilm) => {
    const getCommentFilmElement = (commentData) => {
      const {autor, comment, date, emotion} = commentData;
      const commentDate = getFormatData(date, 'DD/MM/YYYY hh:mm');
      return `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="${emotion}" width="55" height="55" alt="emoji-smile">
        </span>
        <div>
          <p class="film-details__comment-text">${comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${autor}</span>
            <span class="film-details__comment-day">${commentDate}</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`;
    };
    return commentsFilm.map(getCommentFilmElement).join('');
  };

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${poster}" alt="">

            <p class="film-details__age">${ageRating}+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${title}</h3>
                <p class="film-details__title-original">${alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tbody><tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${releaseDate}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${timeConvert(runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${getTemplateGenres(genre)}
              </tr>
            </tbody></table>

            <p class="film-details__film-description">
            ${description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist ${getClassNameActiveControl(watchlist)}" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--watched ${getClassNameActiveControl(alreadyWatched)}" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite ${getClassNameActiveControl(favorite)}" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${data.comments.length}</span></h3>

          <ul class="film-details__comments-list">
          ${isComments ? getTemplateComments(data.comments) : ''}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
            ${isEmoji ? `<img src="./images/emoji/${emojiName}.png" width="30" height="30" alt="emoji">` : ''}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile" ${emojiName === 'smile' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping" ${emojiName === 'sleeping' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke" ${emojiName === 'puke' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry" ${emojiName === 'angry' ? 'checked' : ''}>
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};
export default class FilmDetails extends SmartView {
  constructor(data) {
    super();
    this._data = FilmDetails.parseFilmToData(data);
    this._closeButtonClickHandler = this._closeButtonClickHandler.bind(this);
    this._watchlistClickHandler = this._watchlistClickHandler.bind(this);
    this._alreadyWatchedClickHandler = this._alreadyWatchedClickHandler.bind(this);
    this._favoriteClickHandler = this._favoriteClickHandler.bind(this);
    this._emojiChangeHandler = this._emojiChangeHandler.bind(this);
    this._descriptionTextAreaHandler = this._descriptionTextAreaHandler.bind(this);
    this._setInnerHandlers();
  }

  reset(film) {
    this.updateData(
      FilmDetails.parseFilmToData(film),
    );
  }


  getTemplate() {
    return createFilmDetailsTemplate(this._data);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setAlreadyWatchedHandler(this._callback.alreadyWatchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
    this.setCloseButtonClickHandler(this._callback.closeButtonClick);

  }

  _setInnerHandlers() {
    this.getElement().querySelectorAll('.film-details__emoji-item').forEach((input) => input.addEventListener('click', this._emojiChangeHandler));
    this.getElement().querySelector('.film-details__comment-input').addEventListener('input', this._descriptionTextAreaHandler);
  }

  _emojiChangeHandler(evt) {
    evt.preventDefault();
    if (this._data.emojiName === evt.target.value) {
      return;
    }
    this.updateData({
      isEmoji: true,
      emojiName: evt.target.value,
    });
  }

  _descriptionTextAreaHandler(evt) {
    evt.preventDefault();
    this.updateData({
      textComments: evt.target.value,
    }, true);
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

  setWatchlistClickHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector('.film-details__control-button--watchlist').addEventListener('click', this._watchlistClickHandler);
  }

  setAlreadyWatchedHandler(callback) {
    this._callback.alreadyWatchedClick = callback;
    this.getElement().querySelector('.film-details__control-button--watched').addEventListener('click', this._alreadyWatchedClickHandler);
  }

  setFavoriteClickHandler(callback) {
    this._callback.favoriteClick = callback;
    this.getElement().querySelector('.film-details__control-button--favorite').addEventListener('click', this._favoriteClickHandler);
  }

  _closeButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.closeButtonClick();
  }

  setCloseButtonClickHandler(callback) {
    this._callback.closeButtonClick = callback;
    this.getElement().querySelector('.film-details__close-btn').addEventListener('click', this._closeButtonClickHandler);
  }

  static parseFilmToData(film) {
    return Object.assign(
      {},
      film,
      {
        isComments: film.comments.length > 0,
        isEmoji: false,
        emojiName: null,
      },
    );
  }

  static parseDataToFilm(data) {
    data = Object.assign({}, data);

    if (!data.isEmoji) {
      data.isEmoji = false;
    }

    if (!data.emojiName) {
      data.emojiName = null;
    }

    if (!data.isComments) {
      data.comments = false;
    }

    delete data.isEmoji;
    delete data.emojiName;
    delete data.isComments;

    return data;
  }

}
