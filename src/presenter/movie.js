import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  DETAILS: 'DETAILS',
};

const SELECTOR_POPUP = 'section.film-details';
const CLASS_HIDE_SCROLL = 'hide-overflow';
const body = document.querySelector('body');

export default class Film {
  constructor(filmListContainer, changeData, changeMode) {

    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleCloseCardFilmDetailClick = this._handleCloseCardFilmDetailClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(film) {
    this._film = film;

    const prevfilmCardComponent = this._filmCardComponent;
    const prevfilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(film);
    this._filmDetailsComponent = new FilmDetailsView(film);
    this._popup = this._filmDetailsComponent.getElement();
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setAlreadyWatchedHandler(this._handleAlreadyWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setPosterClickHandler(this._handleCardClick);
    this._filmCardComponent.setTitleClickHandler(this._handleCardClick);
    this._filmCardComponent.setCommentsClickHandler(this._handleCardClick);

    this._filmDetailsComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setAlreadyWatchedHandler(this._handleAlreadyWatchedClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setCloseButtonClickHandler(this._handleCloseCardFilmDetailClick);


    if (prevfilmCardComponent === null) {
      render(this._filmListContainer, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._filmCardComponent, prevfilmCardComponent);
    }

    if (this._mode === Mode.DETAILS) {
      replace(this._filmCardComponent, prevfilmCardComponent);
      replace(this._filmDetailsComponent, prevfilmDetailsComponent);
    }

    remove(prevfilmCardComponent);
    remove(prevfilmDetailsComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._mode = Mode.DEFAULT;
    }
  }

  _closeCardFilmDetails() {
    const popup = document.querySelector(SELECTOR_POPUP);
    if (popup) {
      popup.remove();
      body.classList.remove(CLASS_HIDE_SCROLL);
      document.removeEventListener('keydown', this._handlerEscKeyDown);
      this._mode = Mode.DEFAULT;
    }
  }

  _renderCardFilmDetails() {
    this._closeCardFilmDetails();
    document.addEventListener('keydown', this._escKeyDownHandler);
    body.classList.add(CLASS_HIDE_SCROLL);
    render(body, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    this._changeMode();
    this._mode = Mode.DETAILS;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this._closeCardFilmDetails();
    }
  }

  _handleWatchlistClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          watchlist: !this._film.watchlist,
        },
      ),
    );
  }

  _handleAlreadyWatchedClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          alreadyWatched: !this._film.alreadyWatched,
        },
      ),
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      Object.assign(
        {},
        this._film,
        {
          favorite: !this._film.favorite,
        },
      ),
    );
  }

  _handleCardClick() {
    this._renderCardFilmDetails();
  }

  _handleCloseCardFilmDetailClick() {
    this._closeCardFilmDetails();
  }
}
