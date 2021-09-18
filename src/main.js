import UserProfileView from './view/user-profile.js';
import StatisticsView from './view/statistics.js';
import StatisticsFooterView from './view/statistics-footer.js';
import {render, RenderPosition} from './utils/render.js';
import MovieListPresenter from './presenter/movieList.js';

import Store from './api/store.js';
import Provider from './api/provider.js';

const STORE_PREFIX = 'cinemadict-localstorage';
const STORE_VER = 'v15';
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

import FilmsModel from './model/films-model.js';
import FilterModel from './model/filter.js';
import CommentsModel from './model/comments-model.js';

import FilterPresenter from './presenter/filter.js';
import {FilterType, UpdateType, AUTHORIZATION, END_POINT} from './const.js';
import Api from './api/api.js';


const SELECTOR_STATS = '.statistic';
const api = new Api(END_POINT, AUTHORIZATION);

const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);

const movieListPresenter = new MovieListPresenter(filmsModel, filterModel, commentsModel, apiWithProvider);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
movieListPresenter.init();

let statisticsComponent = null;
const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case FilterType.STATS:
      movieListPresenter.hideElement();
      statisticsComponent = new StatisticsView(filmsModel.getFilms());
      render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
      break;
    default: {
      const statsBlock = document.querySelector(SELECTOR_STATS);
      if (statsBlock) {
        statsBlock.remove();
      }
      movieListPresenter.showElement();
    }
  }
};


apiWithProvider.getFilms()
  .then((films) => {
    filterPresenter.init();
    filterPresenter.setMenuTypeChangeHandler(handleSiteMenuClick);
    filmsModel.setFilms(UpdateType.INIT, films);
    render(siteFooterStatisticsElement, new StatisticsFooterView(films.length), RenderPosition.BEFOREEND);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });

window.addEventListener('load', () => {
  navigator.serviceWorker.register('/sw.js');
});

window.addEventListener('online', () => {
  document.title = document.title.replace(' [offline]', '');
  apiWithProvider.sync();
});

window.addEventListener('offline', () => {
  document.title += ' [offline]';
});
