const filmsToFilterMap = {
  watchlist: (films) => films
    .filter((film) => film.filmInfo.userDetails.watchlist).length,
  history: (films) => films
    .filter((film) => film.filmInfo.userDetails.alreadyWatched).length,
  favorites: (films) => films
    .filter((film) => film.filmInfo.userDetails.favorite).length,
};

export const generateFilter = (films) => Object.entries(filmsToFilterMap).map(
  ([filterName, countFilms]) => ({
    name: filterName,
    count: countFilms(films),
  }),
);

export const generateTopFilms = (films) => {
  const topFilms = films.slice();
  topFilms.sort((second, first) => first.filmInfo.totalRating - second.filmInfo.totalRating);
  return topFilms;
};

export const generateMostCommentedFilms = (films) => {
  const mostCommentedFilms = films.slice();
  mostCommentedFilms.sort((second, first) => first.comments.length - second.comments.length);
  return mostCommentedFilms ;
};
