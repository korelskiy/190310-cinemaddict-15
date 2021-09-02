import UserProfileView from './view/user-profile.js';
import StatisticsView from './view/statistics.js';
import StatisticsFooterView from './view/site-footer-statistics.js';
import {generateFilms} from './mock/film.js';
import {render, RenderPosition} from './utils/render.js';
import MovieListPresenter from './presenter/movieList.js';
import FilmsModel from './model/films-model.js';
import FilterModel from './model/filter.js';
import FilterPresenter from './presenter/filter.js';
import {FilterType} from './const.js';


const FILMS_COUNT = 24;
const films = generateFilms(FILMS_COUNT);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
const movieListPresenter = new MovieListPresenter(filmsModel, filterModel);
const filterPresenter = new FilterPresenter(siteMainElement, filterModel, filmsModel);
const statisticsComponent = new StatisticsView(filmsModel);

filterPresenter.init();
movieListPresenter.init();

render(siteMainElement, statisticsComponent, RenderPosition.BEFOREEND);
statisticsComponent.hideElement();


const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case FilterType.STATS:
      movieListPresenter.hideElement();
      statisticsComponent.showElement();
      // Показать статистику
      //statComponent.updateElement();
      //statComponent.setPeriodTypeChangeHandler();
      //filmsPresenter.updateFooter();
      break;
    default:
      movieListPresenter.showElement();
      statisticsComponent.hideElement();
  }
};

filterPresenter.setMenuTypeChangeHandler(handleSiteMenuClick);

render(siteFooterStatisticsElement, new StatisticsFooterView(films.length), RenderPosition.BEFOREEND);
