import {generateFilms} from './mock/film.js';
//import {generateFilter, generateTopFilms, generateMostCommentedFilms} from './mock/filter.js';
//import {render, RenderPosition, remove} from '../utils/render.js';
import MovieListPresenter from './presenter/movieList.js';

const FILMS_COUNT = 24;

const films = generateFilms(FILMS_COUNT);
//const filters = generateFilter(films);
//const topRatedFilms = generateTopFilms(films);
//const mostCommentedFilms = generateMostCommentedFilms(films);

const movieListPresenter = new MovieListPresenter();

movieListPresenter.init(films);
