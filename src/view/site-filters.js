import AbstractView from './abstract.js';
import {FilterType} from '../const.js';

const createSiteNavigationTemplate = (filters, currentFilterType) =>  {
  const {type, name, count} = filters;

  if (name !== 'All movies') {
    return (
      `<a href="#${name}" class="main-navigation__item ${type === currentFilterType ?
        'main-navigation__item--active' :
        ''}" data-sort-type="${type}">${name} <span class="main-navigation__item-count">${count}</span></a>`
    );
  } else {
    return (`<a href="#${name}" class="main-navigation__item ${type === currentFilterType ?
      'main-navigation__item--active' :
      ''}" data-sort-type="${type}">${name} </a>`
    );
  }
};

const createSiteMenuTemplate = (filters, currentFilterType) => {
  const filtersItemsTemplate = filters.map((filter) => createSiteNavigationTemplate(filter, currentFilterType)).join('');
  return (
    `<nav class="main-navigation">
      <div class="main-navigation__items">
        ${filtersItemsTemplate}
        </div>
      <a href="#stats" class="main-navigation__additional" data-filter="${FilterType.STATS}">Stats</a>
    </nav>`
  );
};

export default class FilmsFilters extends AbstractView {
  constructor(filters, currentFilterType) {
    super();

    this._filters = filters;
    this._currentFilter = currentFilterType;
    this._statisticsElement = this.getElement().querySelector('.main-navigation__additional');
    this._menuClickHandler = this._menuClickHandler.bind(this);
    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSiteMenuTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.sortType);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    const filters = this.getElement().querySelectorAll('.main-navigation__item');
    filters.forEach((filter) => filter.classList.remove('main-navigation__item--active'));
    this._statisticsElement.classList.add('main-navigation__item--active');
    this._callback.menuClick(evt.target.dataset.filter);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().querySelectorAll('.main-navigation__item').forEach((navigationItem) => navigationItem.addEventListener('click', this._filterTypeChangeHandler));
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().querySelector('.main-navigation__additional').addEventListener('click', this._menuClickHandler);
  }
}
