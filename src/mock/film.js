import {getRandomInteger, generateDate} from './../util.js';

const MIN_YEAR_GAP_FILM = 0;
const MAX_YEAR_GAP_FILM = 50;

const MIN_DAY_GAP_COMMENT = 0;
const MAX_DAY_GAP_COMMENT = 180;

const MIN_DAY_GAP_WATCHING_FILM = 0;
const MAX_DAY_GAP_WATCHING_FILM = 360;

const MIN_DESCRIPTION_FILM_COUNT = 1;
const MAX_DESCRIPTION_FILM_COUNT = 5;

const MIN_WRITER_FILM_COUNT = 1;
const MAX_WRITER_FILM_COUNT = 5;

const MIN_ACTORS_FILM_COUNT = 1;
const MAX_ACTORS_FILM_COUNT = 5;

const MIN_COMMENTS_FILM_COUNT = 0;
const MAX_COMMENTS_FILM_COUNT = 5;

const MIN_GENRES_FILM_COUNT = 1;
const MAX_GENRES_FILM_COUNT = 5;

// Функция генерации случайного названия фильма;
const generateFilmTitle = () => {
  const titles = [
    'Made for Each Other',
    'Popeye Meets Sinbad',
    'Sagebrush Trail',
    'Santa Claus conquers the Martians',
    'The Great Flamarion',
    'The Man With The Golden Arm',
  ];
  const randomIndex = getRandomInteger(0, titles.length - 1);
  return titles[randomIndex];
};

// Функция генерации случайного постера к фильму;
const generateFilmPoster = () => {
  const posters = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];
  const randomIndex = getRandomInteger(0, posters.length - 1);
  return posters[randomIndex];
};

// Функция генерации случайного описания фильма (от 1 до 5 случайных предложений из текста);
const generateFilmDescription = () => {
  const descriptions = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const getRandomDescription = () => {
    const description = descriptions[getRandomInteger(0, descriptions.length - 1)];
    return description;
  };

  const descriptionFilm = new Array(getRandomInteger(MIN_DESCRIPTION_FILM_COUNT, MAX_DESCRIPTION_FILM_COUNT))
    .fill(null)
    .map(getRandomDescription)
    .join(' ');

  return descriptionFilm;
};

// Функция генерации случайного списка сценаристов к фильму (от 1 до 5 случайных сценаристов);
const generateFilmWriters = () => {
  const writers = [
    'Anne Wigton',
    'Heinz Herald',
    'Richard Weil',
    'Billy Wilder',
    'Joel David Coen',
    'Robert Burton Towne',
    'Quentin Jerome Tarantino',
  ];

  const getRandomWriter = () => {
    const writer = writers[getRandomInteger(0, writers.length - 1)];
    return writer;
  };

  const writersForFilm = new Array(getRandomInteger(MIN_WRITER_FILM_COUNT, MAX_WRITER_FILM_COUNT))
    .fill(null)
    .map(getRandomWriter)
    .join(', ');

  return writersForFilm;
};

// Функция генерации случайного списка актеров к фильму (от 1 до 5 случайных актеров);
const generateFilmActors = () => {
  const actors = [
    'Erich von Stroheim',
    'Mary Beth Hughes',
    'Dan Duryea',
    'Johnny Depp',
    'Leonardo Wilhelm DiCaprio',
    'Brad Pitt',
    'Tom Cruise',
  ];

  const getRandomActor = () => {
    const actor = actors[getRandomInteger(0, actors.length - 1)];
    return actor;
  };

  const actorsForFilm = new Array(getRandomInteger(MIN_ACTORS_FILM_COUNT, MAX_ACTORS_FILM_COUNT))
    .fill(null)
    .map(getRandomActor)
    .join(', ');

  return actorsForFilm;
};

// Функция генерации случайного жанра к фильму;
const generateFilmGenres = () => {
  const genres = [
    'Action',
    'Comedy',
    'Drama',
    'Fantasy',
    'Historical',
    'Musical',
    'Romance',
    'Thriller',
    'Western',
  ];

  const getRandomGenre = () => {
    const genre = genres[getRandomInteger(0, genres.length - 1)];
    return genre;
  };

  const genresForFilm = new Array(getRandomInteger(MIN_GENRES_FILM_COUNT, MAX_GENRES_FILM_COUNT))
    .fill(null)
    .map(getRandomGenre);

  return genresForFilm;
};

// Функция генерации случайной страны фильма;
const generateFilmСountry = () => {
  const сountries = [
    'South Korea',
    'France',
    'Germany',
    'China',
    'India',
    'Russia',
    'Australia',
    'United States',
  ];

  const randomIndex = getRandomInteger(0, сountries.length - 1);
  return сountries[randomIndex];
};

// Функция генерации случайного кинорежиссера фильма;
const generateFilmDirector = () => {
  const directors = [
    'Steven Allan Spielberg',
    'Martin Scorsese',
    'Sir Alfred Joseph Hitchcock',
    'Stanley Kubrick',
    'Francis Ford Coppola',
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);
  return directors[randomIndex];
};

// Функция генерации случайного комментария к фильму;
const generateComment = () => {
  const autors = [
    'John Doe',
    'Tim Macoveev',
    'Oleg Gurzo',
    'Andrey Popov',
    'Sergey Ivanov',
  ];

  const emotions = [
    'angry',
    'puke',
    'sleeping',
    'smile',
  ];

  const commentsText = [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Very very old. Meh',
    'Almost two hours? Seriously?',
  ];

  const randomIndexEmotion = getRandomInteger(0, emotions.length - 1);
  const randomIndexAutor = getRandomInteger(0, autors.length - 1);
  const randomIndexCommentText = getRandomInteger(0, commentsText.length - 1);

  return {
    id: 0,
    autor: autors[randomIndexAutor],
    comment: commentsText[randomIndexCommentText],
    date: generateDate(MIN_DAY_GAP_COMMENT, MAX_DAY_GAP_COMMENT, 'day'),
    emotion: `./images/emoji/${emotions[randomIndexEmotion]}.png`,
  };
};

// Функция генерации случайного списка комментарий к фильму (от 0 до 5 случайных комментариев);
const generateCommentsFilm = () => {
  const comments = [];
  const randomCountComments = getRandomInteger(MIN_COMMENTS_FILM_COUNT, MAX_COMMENTS_FILM_COUNT);

  for (let i = 0; i < randomCountComments; i++) {
    const comment = generateComment();
    comment.id = i;
    comments.push(comment);
  }

  return comments;
};

// Функция генерации случайных данных к фильму;
const generateFilm = () => {
  const title = generateFilmTitle();
  return {
    id: 0,
    comments: generateCommentsFilm(),
    filmInfo: {
      title: title,
      alternativeTitle: `Alternative Title For ${title}`,
      totalRating: getRandomInteger(1, 9).toFixed(1),
      poster: generateFilmPoster(),
      ageRating: getRandomInteger(0, 21),
      director: generateFilmDirector(),
      writers: generateFilmWriters(),
      actors: generateFilmActors(),
      release: {
        date: generateDate(MIN_YEAR_GAP_FILM, MAX_YEAR_GAP_FILM, 'year'),
        releaseCountry: generateFilmСountry(),
      },
      runtime: getRandomInteger(45, 360),
      genre: generateFilmGenres(),
      description: generateFilmDescription(),
      userDetails: {
        watchlist: Boolean(getRandomInteger(0, 1)),
        alreadyWatched: Boolean(getRandomInteger(0, 1)),
        watchingDate: generateDate(MIN_DAY_GAP_WATCHING_FILM, MAX_DAY_GAP_WATCHING_FILM, 'day'),
        favorite: Boolean(getRandomInteger(0, 1)),
      },
    },
  };
};

// Функция генерации массива mock-овых данных к фильмам;
export const generateFilms = (count) => {
  const films = [];

  for (let i = 0; i < count; i++) {
    const film = generateFilm();
    film.id = i;
    films.push(film);
  }

  return films;
};

