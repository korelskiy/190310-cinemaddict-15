import FilmCardView from '../view/film-card.js';
import FilmDetailsView from '../view/film-details.js';
import {render, RenderPosition, remove, replace} from '../utils/render.js';
import {UserAction, UpdateType} from '../const.js';
import {FilterType} from '../const';
import ApiComments from '../api-comments.js';
import {AUTHORIZATION, END_POINT} from '../const.js';
import CommentsModel from '../model/comments.js';

const apiComments = new ApiComments(END_POINT, AUTHORIZATION);

const commentsModel = new CommentsModel();
/////////////////////////////////////////////////////////////////

// Временно подключил nanoid, generateDate и const для генерации недостоющих данных;
import {generateDate} from '../utils/film.js';
import {nanoid} from 'nanoid';

const MIN_DAY_GAP_COMMENT = 0;
const MAX_DAY_GAP_COMMENT = 180;

//////////////////////////////////////////////////////////////////

const Mode = {
  DEFAULT: 'DEFAULT',
  DETAILS: 'DETAILS',
};

const SELECTOR_POPUP = 'section.film-details';
const CLASS_HIDE_SCROLL = 'hide-overflow';
const body = document.querySelector('body');

export default class Film {
  constructor(filmListContainer, changeData, changeMode, filmsModel) {

    this._filmListContainer = filmListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._filmsModel = filmsModel;
    this._filmCardComponent = null;
    this._filmDetailsComponent = null;
    this._mode = Mode.DEFAULT;

    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleAlreadyWatchedClick = this._handleAlreadyWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._handleCardClick = this._handleCardClick.bind(this);
    this._handleCloseCardFilmDetailClick = this._handleCloseCardFilmDetailClick.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleDeleteComment = this._handleDeleteComment.bind(this);
    this._handleAddComment = this._handleAddComment.bind(this);
  }

  init(film) {
    this._film = film;
    const prevfilmCardComponent = this._filmCardComponent;
    const prevfilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardView(this._film);
    this._filmDetailsComponent = new FilmDetailsView(this._film);
    this._filmCardComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmCardComponent.setAlreadyWatchedHandler(this._handleAlreadyWatchedClick);
    this._filmCardComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmCardComponent.setPosterClickHandler(this._handleCardClick);
    this._filmCardComponent.setTitleClickHandler(this._handleCardClick);
    this._filmCardComponent.setCommentsClickHandler(this._handleCardClick);

    this._filmDetailsComponent.setWatchlistClickHandler(this._handleWatchlistClick);
    this._filmDetailsComponent.setAlreadyWatchedHandler(this._handleAlreadyWatchedClick);
    this._filmDetailsComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._filmDetailsComponent.setDeleteCommentListener(this._handleDeleteComment);
    this._filmDetailsComponent.setAddCommentHandler(this._handleAddComment);
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
    remove(this._filmDetailsComponent);
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
    apiComments.getComments(this._film).then((comments) => {
      for (let key in comments) {
        console.log(comments[key]);
      }
    });
    /*
    apiComments.getComments(this._film)
      .then((comments) => {
        this._filmDetailsComponent.setComments(comments);
      });
    */
    this._closeCardFilmDetails();
    document.addEventListener('keydown', this._escKeyDownHandler);
    body.classList.add(CLASS_HIDE_SCROLL);
    render(body, this._filmDetailsComponent, RenderPosition.BEFOREEND);
    this._filmDetailsComponent.reset(this._film);
    this._changeMode();
    this._mode = Mode.DETAILS;
  }

  _escKeyDownHandler(evt) {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      this._closeCardFilmDetails();
    }
  }

  _handleDeleteComment(id) {
    const commentDel = this._film.comments.find((comment) => comment.id === id);
    this._changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {...this._film, comments: commentDel},
    );
  }

  _handleAddComment(value, emotion) {
    const newComment = {
      id: nanoid(),
      autor: 'Korelskiy Anton',
      comment: value,
      date: generateDate(MIN_DAY_GAP_COMMENT, MAX_DAY_GAP_COMMENT, 'day'),
      emotion: `./images/emoji/${emotion}.png`,
    };

    this._changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      {...this._film, comments: newComment},
    );
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          watchlist: !this._film.watchlist,
        },
      ),
      FilterType.WATCHLIST,
    );
  }

  _handleAlreadyWatchedClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          alreadyWatched: !this._film.alreadyWatched,
        },
      ),
      FilterType.HISTORY,
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_FILM,
      UpdateType.PATCH,
      Object.assign(
        {},
        this._film,
        {
          favorite: !this._film.favorite,
        },
      ),
      FilterType.FAVORITE,
    );
  }

  _handleCardClick() {
    this._renderCardFilmDetails();
  }

  _handleCloseCardFilmDetailClick() {
    this._closeCardFilmDetails();
  }
}
