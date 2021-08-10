import AbstractView from './abstract.js';

const createSiteNavigationTemplate = (filters) =>  {

  const filterWatchlist = filters.find((filter) => filter.name === 'watchlist');
  const filterHistory = filters.find((filter) => filter.name === 'history');
  const filterFavorites = filters.find((filter) => filter.name === 'favorites');

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${filterWatchlist.count}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${filterHistory.count}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${filterFavorites.count}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

export default class FilmsFilters extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createSiteNavigationTemplate(this._filters);
  }
}
