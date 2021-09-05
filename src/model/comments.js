import AbstractObserver from '../utils/abstract-observer.js';
import FilmModel from '../model/films-model.js';

export default class Comments extends AbstractObserver {
  constructor() {
    super();
    this._comments = {};
  }

  setComments(_comments) {

    if (!_comments) {
      return;
    }
    this._comments = Object.assign(
      {},
      _comments,
    );
    console.log(this._comments);
  }

  getComments() {
    return this._comments;
  }

  deleteComment(updateType, update) {
    if (this._comments[update.idMessage] !== 'undefined') {
      delete this._comments[update.idMessage];
    } else {
      throw new Error('Can\'t delete unexisting comment');
    }
    this._notify(updateType, update);
  }

  addComment(updateType, update) {
    this._comments = update;
    this._notify(updateType, update);
  }

  static adaptToClient(comments) {
    const adaptedComments = Object.assign(
      {},
      comments,
      {
        idMessage: comments.id,
        text: comments.comment,
        emoji: comments.emotion,
        date: comments.date,
        author: comments.author,
      });

    delete adaptedComments.emotion;
    delete adaptedComments.id;
    delete adaptedComments.comment;

    return adaptedComments;
  }

  static adaptNewCommentToClient(response) {
    const {movie, comments} = response;
    const adaptedResponse = [];
    const adaptedFilm = FilmModel.adaptToClient(movie);
    const makeObjectFromArray = function (commentsOfFilm) {
      const commentsList = {};
      for (let i = 0; i < commentsOfFilm.length; i++) {
        commentsList[commentsOfFilm[i].idMessage] = commentsOfFilm[i];
      }
      return commentsList;
    };
    const adaptedComment = makeObjectFromArray(comments.map(Comments.adaptToClient));
    adaptedResponse.push(adaptedFilm);
    adaptedResponse.push(adaptedComment);
    return adaptedResponse;
  }

  static adaptToServer(comments) {
    if (comments.author && comments.idMessage) {
      const adaptedComments = Object.assign(
        {},
        comments,
        {
          emotion: comments.emoji,
          id: comments.idMessage,
          comment: comments.text,
          date: comments.date,
          author: comments.author,
        });

      delete adaptedComments.idMessage;
      delete adaptedComments.text;
      delete adaptedComments.emoji;
      delete adaptedComments.daysAgo;

      return adaptedComments;
    } else {
      const adaptedComments = Object.assign(
        {},
        comments,
        {
          emotion: comments.emoji,
          comment: comments.text,
          date: comments.date,
        });

      delete adaptedComments.text;
      delete adaptedComments.emoji;
      delete adaptedComments.daysAgo;

      return adaptedComments;
    }
  }

  static adaptToServerNewComment(comments) {
    const adaptedComments = Object.assign(
      {},
      comments,
      {
        emotion: comments.emoji,
        comment: comments.text,
        date: comments.date,
      });

    delete adaptedComments.text;
    delete adaptedComments.emoji;
    delete adaptedComments.author;
    delete adaptedComments.idMessage;
    delete adaptedComments.daysAgo;
    return adaptedComments;
  }

}
