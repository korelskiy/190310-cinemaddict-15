import UserProfileView from './view/user-profile.js';
import FilmsFiltersView from './view/site-filters.js';
//import StatisticsView from './view/statistics.js';
import StatisticsFooterView from './view/site-footer-statistics.js';
import {generateFilms} from './mock/film.js';
import {generateFilter} from './mock/filter.js';
import {render, RenderPosition} from './utils/render.js';
import MovieListPresenter from './presenter/movieList.js';
import FilmsModel from './model/films-model.js';

const FILMS_COUNT = 24;
const films = generateFilms(FILMS_COUNT);
const filters = generateFilter(films);

const filmsModel = new FilmsModel();
filmsModel.setFilms(films);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
const siteFooterStatisticsElement = siteFooterElement.querySelector('.footer__statistics');

render(siteHeaderElement, new UserProfileView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilmsFiltersView(filters), RenderPosition.BEFOREEND);

const movieListPresenter = new MovieListPresenter(filmsModel);
movieListPresenter.init();

/* Временно скрыл отрисовку страницы статистики
render(siteMainElement, new StatisticsView().getElement(), RenderPosition.BEFOREEND);
*/

render(siteFooterStatisticsElement, new StatisticsFooterView(films.length), RenderPosition.BEFOREEND);
