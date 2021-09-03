export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const UserAction = {
  UPDATE_FILM: 'UPDATE_FILM',
  ADD_COMMENT: 'ADD_COMMENT',
  DELETE_COMMENT: 'DELETE_COMMENT',
  CHANGE_FILTER: 'CHANGE_FILTER',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
};


export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchList',
  HISTORY: 'alreadyWatched',
  FAVORITE: 'favorite',
  STATS: 'stats',
};

export const Rating = {
  NOVICE: {
    name: 'Novice',
    count: 1,
  },
  FAN: {
    name: 'Fan',
    count: 11,
  },
  MOVIE_BUFF: {
    name: 'Movie Buff',
    count: 21,
  },
};

export const Period = {
  ALL: 'all',
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
};
