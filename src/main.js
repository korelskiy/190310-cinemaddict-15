import UserProfileView from './view/user-profile.js';
import StatisticsView from './view/statistics.js';
import StatisticsFooterView from './view/site-footer-statistics.js';
import {render, RenderPosition} from './utils/render.js';
import MovieListPresenter from './presenter/movieList.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import {FilterType, UpdateType, AUTHORIZATION, END_POINT} from './const.js';
import Api from './api.js';


const api = new Api(END_POINT, AUTHORIZATION);

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
const movieListPresenter = new MovieListPresenter(filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const statisticsComponent = new StatisticsView(filmsModel.getFilms());

render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case FilterType.STATS:
      movieListPresenter.hideElement();
      statisticsComponent.showElement();
      break;
    default:
      movieListPresenter.showElement();
      statisticsComponent.hideElement();
  }
};

api.getFilms()
  .then((films) => {
    filterPresenter.init();
    filterPresenter.setMenuTypeChangeHandler(handleSiteMenuClick);
    filmsModel.setFilms(UpdateType.INIT, films);
    render(siteFooterStatisticsElement, new StatisticsFooterView(films.length), RenderPosition.BEFOREEND);
    statisticsComponent.hideElement();
  })
  .catch(() => {
    filterPresenter.init();
    filterPresenter.setMenuTypeChangeHandler(handleSiteMenuClick);
    filmsModel.setFilms(UpdateType.INIT, []);
    statisticsComponent.hideElement();
  });
