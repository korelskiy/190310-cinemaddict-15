import {FilterType} from '../const';

export const filter = {
  [FilterType.ALL]: (films) => films,
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.watchlist),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.alreadyWatched),
  [FilterType.FAVORITE]: (films) => films.filter((film) => film.favorite),
};
