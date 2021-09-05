import AbstractObserver from '../utils/abstract-observer.js';

export default class FilmsModel extends AbstractObserver {
  constructor() {
    super();
    this._films = [];
  }

  setFilms(updateType, filmsList) {
    this._films = filmsList.slice();
    this._notify(updateType);
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
  /*
  addComment(updateType, update) {
    const indexFilm = this._films.findIndex((film) => film.id === update.id);
    if (indexFilm === -1) {
      throw new Error('Can\'t update unexisting film');
    }
    const newComment = update.comments;
    this._films[indexFilm].comments = [...this._films[indexFilm].comments, newComment];
    this._notify(updateType, this._films[indexFilm]);
  }

  deleteComment(updateType, update) {
    const indexFilm = this._films.findIndex((film) => film.id === update.id);
    const indexComment = this._films[indexFilm].comments.findIndex((comment) => comment.id === update.comments.id);
    if (indexComment === -1) {
      throw new Error('Can\'t delete unexisting comment');
    }
    this._films[indexFilm].comments = [
      ...this._films[indexFilm].comments.slice(0, indexComment),
      ...this._films[indexFilm].comments.slice(indexComment + 1),
    ];
    this._notify(updateType, this._films[indexFilm]);
  }

  */

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        id: film.id,
        comments: film.comments,
        title: film.film_info.title,
        alternativeTitle: film.film_info.alternative_title,
        totalRating: film.film_info.total_rating,
        poster: film.film_info.poster,
        ageRating: film.film_info.age_rating,
        director: film.film_info.director,
        writers: film.film_info.writers,
        actors: film.film_info.actors,
        release: {
          date: film.film_info.release.date !== null ? new Date(film.film_info.release.date) : film.film_info.release.date,
          releaseCountry: film.film_info.release.release_country,
        },
        runtime: film.film_info.runtime,
        genre: film.film_info.genre,
        description: film.film_info.description,
        watchlist: film.user_details.watchlist,
        alreadyWatched: film.user_details.already_watched,
        watchingDate: film.user_details.watching_date !== null ? new Date(film.user_details.watching_date) : film.user_details.watching_date,
        favorite: film.user_details.favorite,
      },
    );
    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;
    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
      {},
      film,
      {
        'comments': film.comments,
        'film_info': {
          'actors': film.actors,
          'age_rating': film.ageRating,
          'alternative_title': film.alternativeTitle,
          'description': film.description,
          'director': film.director,
          'genre': film.genre,
          'poster': film.poster,
          'release': {
            'date': film.release.date.toISOString(),
            'release_country': film.release.releaseCountry,
          },
          'runtime': film.runtime,
          'title': film.title,
          'total_rating': +film.totalRating,
          'writers': film.writers,
        },
        'id': film.id,
        'user_details': {
          'watchlist': film.watchlist,
          'already_watched': film.alreadyWatched,
          'watching_date': film.watchingDate.toISOString(),
          'favorite': film.favorite,
        },
      },
    );

    delete adaptedFilm.title;
    delete adaptedFilm.alternativeTitle;
    delete adaptedFilm.totalRating;
    delete adaptedFilm.poster;
    delete adaptedFilm.ageRating;
    delete adaptedFilm.director;
    delete adaptedFilm.writers;
    delete adaptedFilm.actors;
    delete adaptedFilm.release;
    delete adaptedFilm.runtime;
    delete adaptedFilm.genre;
    delete adaptedFilm.description;
    delete adaptedFilm.watchlist;
    delete adaptedFilm.alreadyWatched;
    delete adaptedFilm.watchingDate;
    delete adaptedFilm.favorite;
    return adaptedFilm;
  }
}
