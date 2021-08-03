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
