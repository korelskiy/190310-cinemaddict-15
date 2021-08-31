import AbstractObserver from '../utils/abstract-observer.js';

export default class FilmsModel extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(filmsList) {
    this._films = filmsList.slice();
  }

  getFilms() {
    return this._films;
  }

  updateFilm(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting film');
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't add comment to unexisting film`);
    }
    this._films[index].comments = update.comments;
    this._notify(updateType, update);
  }

  deleteComment(updateType, update) {
    const needComments = this._films.filter((film) => film.comments.includes(update));
    console.log(needComments);

    /*
    .find((filmComment) => filmComment.id === update.id)
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting comment`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1),
    ];
    this._notify(updateType, update);
    */
  }
}
