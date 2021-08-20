const filmsToFilterMap = {
  watchlist: (films) => films
    .filter((film) => film.watchlist).length,
  history: (films) => films
    .filter((film) => film.alreadyWatched).length,
  favorites: (films) => films
    .filter((film) => film.favorite).length,
};

export const generateFilter = (films) => Object.entries(filmsToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);

export const generateTopFilms = (films) => {
  const topFilms = films.slice();
  topFilms.sort((second, first) => first.totalRating - second.totalRating);
  return topFilms;
};

export const generateMostCommentedFilms = (films) => {
  const mostCommentedFilms = films.slice();
  mostCommentedFilms.sort((second, first) => first.comments.length - second.comments.length);
  return mostCommentedFilms ;
};
