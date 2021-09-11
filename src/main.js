import UserProfileView from './view/user-profile.js';
import StatisticsView from './view/statistics.js';
import StatisticsFooterView from './view/site-footer-statistics.js';
import {render, RenderPosition} from './utils/render.js';
import MovieListPresenter from './presenter/movieList.js';

import FilmsModel from './model/films-model.js';
import FilterModel from './model/filter.js';
import CommentsModel from './model/comments-model.js';

import FilterPresenter from './presenter/filter.js';
import {FilterType, UpdateType, AUTHORIZATION, END_POINT} from './const.js';
import Api from './api.js';


const SELECTOR_STATS = '.statistic';
const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);

const movieListPresenter = new MovieListPresenter(filmsModel, filterModel, commentsModel, api);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);


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


api.getFilms()
  .then((films) => {
    filterPresenter.init();
    filmsModel.setFilms(UpdateType.INIT, films);
    filterPresenter.setMenuTypeChangeHandler(handleSiteMenuClick);

    render(siteFooterStatisticsElement, new StatisticsFooterView(films.length), RenderPosition.BEFOREEND);
  })
  .catch(() => {
    filmsModel.setFilms(UpdateType.INIT, []);
  });
