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
