import dayjs from 'dayjs';

const MAX_COUNT_DESCRIPTION = 140;

export const createFilmCardTemplate = (film) =>  {
  const {title, totalRating, genre, description, release, runtime, poster} = film.filmInfo;

  const createDescriptionText = (descriptionText) => {
    if (descriptionText.length < MAX_COUNT_DESCRIPTION) {
      return descriptionText;
    }
    return `${descriptionText.slice(0, MAX_COUNT_DESCRIPTION - 3)}...`;
  };

  const date = dayjs(release.date).format('YYYY');

  const timeConvert = (time) => {
    const hours = (time / 60);
    const roundingHours = Math.floor(hours);
    const minutes = (hours - roundingHours) * 60;
    const roundingMinutes = Math.round(minutes);
    return  `${roundingHours}h ${roundingMinutes}m`;
  }

  return `<article class="film-card">
    <h3 class="film-card__title">${title}</h3>
    <p class="film-card__rating">${totalRating}</p>
    <p class="film-card__info">
      <span class="film-card__year">${date}</span>
      <span class="film-card__duration">${timeConvert(runtime)}</span>
      <span class="film-card__genre">${genre}</span>
    </p>
    <img src="./images/posters/${poster}"  alt="" class="film-card__poster">
    <p class="film-card__description">${createDescriptionText(description)}</p>
    <a class="film-card__comments">${film.comments.length} comments</a>
    <div class="film-card__controls">
      <button class="film-card__controls-item film-card__controls-item--add-to-watchlist" type="button">Add to watchlist</button>
      <button class="film-card__controls-item film-card__controls-item--mark-as-watched" type="button">Mark as watched</button>
      <button class="film-card__controls-item film-card__controls-item--favorite" type="button">Mark as favorite</button>
    </div>
  </article>`
};
