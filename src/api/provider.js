import FilmsModel from '../model/films-model.js';
import {isOnline} from '../utils/common.js';

const ErrorMessage = {
  GET_COMMENTS: 'get comments failed',
  ADD_COMMENT: 'add comment failed',
  DELETE_COMMENT: 'delete comment failed',
  SYNC: 'Sync data failed failed',
};

const getSyncedFilms = (items) =>
  items
    .filter(({success}) => success)
    .map(({payload}) => payload.task);

const createStoreStructure = (items) =>
  items
    .reduce((acc, current) => Object.assign({}, acc, {
      [current.id]: current,
    }), {});


export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const items = createStoreStructure(films.map(FilmsModel.adaptToServer));
          this._store.setItems(items);
          return films;
        });
    }
    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(storeFilms.map(FilmsModel.adaptToClient));
  }


  updateFilm(film) {
    if (isOnline()) {
      return this._api.updateFilm(film)
        .then((update) => {
          this._store.setItem(update.id, FilmsModel.adaptToServer(update));
          return update;
        });
    }

    this._store.setItem(film.id, FilmsModel.adaptToServer(Object.assign({}, film)));
    return Promise.resolve(film);
  }

  getComments(filmId){
    if (isOnline()) {
      return this._api.getComments(filmId);
    }

    return Promise.reject(new Error(ErrorMessage.GET_COMMENTS));
  }

  addComment(comment, filmId) {
    if (isOnline()) {
      return this._api.addComment(comment, filmId);
    }

    return Promise.reject(new Error(ErrorMessage.ADD_COMMENT));
  }

  deleteComment(commentId) {
    if (isOnline()) {
      return this._api.deleteComment(commentId);
    }

    return Promise.reject(new Error(ErrorMessage.DELETE_COMMENT));
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());
      return this._api.sync(storeFilms)
        .then((response) => {
          const createdFilms = getSyncedFilms(response.created);
          const updatedFilms = getSyncedFilms(response.updated);

          const films = createStoreStructure([...createdFilms, ...updatedFilms]);

          this._store.setItems(films);
        });
    }

    return Promise.reject(new Error(ErrorMessage.SYNC));
  }
}


