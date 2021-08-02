import dayjs from 'dayjs';

// Функция, возвращающая случайное целое число из переданного диапазона включительно;
const getRandomInteger = (min, max) => (max > min) ? Math.floor(Math.random() * (max - min + 1)) + min : null;

const generateDateFilm = () => {

  const minYearGap = 0;
  const maxYearGap = 50;

  const yearsGap = getRandomInteger(minYearGap, maxYearGap);

  return dayjs().subtract(yearsGap, 'year').toDate();
};

const generateDateComment = () => {

  const minDayGap = 0;
  const maxDayGap = 180;

  const daysGap = getRandomInteger(minDayGap, maxDayGap);

  return dayjs().subtract(daysGap, 'day').toDate();
};

// Функция получения названия фильма;
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

// Функция генерации имени файла постера на основе имени фильма;
const getFileName = (title) =>
  title.split(' ')
    .map((word) => word.toLowerCase())
    .join('-');

// Функция генерации описания фильма (от 1 до 5 случайных предложений из текста);
const generateFilmDescription = () => {
  const MIN_DESCRIPTION_COUNT = 1;
  const MAX_DESCRIPTION_COUNT = 5;

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

  const descriptionFilm = new Array(getRandomInteger(MIN_DESCRIPTION_COUNT, MAX_DESCRIPTION_COUNT))
    .fill(null)
    .map(getRandomDescription)
    .join(' ');

  return descriptionFilm;
};

// Функция генерации сценаристов к фильму (от 1 до 5 случайных писателей);
const generateFilmWriters = () => {
  const MIN_WRITER_COUNT = 1;
  const MAX_WRITER_COUNT = 5;

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

  const writersFilm = new Array(getRandomInteger(MIN_WRITER_COUNT, MAX_WRITER_COUNT))
    .fill(null)
    .map(getRandomWriter)
    .join(', ');

  return writersFilm;
};

// Функция генерации актеров к фильму (от 1 до 5 случайных актеров);
const generateFilmActors = () => {
  const MIN_ACTORS_COUNT = 1;
  const MAX_ACTORS_COUNT = 5;

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

  const actorsFilm = new Array(getRandomInteger(MIN_ACTORS_COUNT, MAX_ACTORS_COUNT))
    .fill(null)
    .map(getRandomActor)
    .join(', ');

  return actorsFilm;
};

// Функция генерации жанров фильма;
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

  const randomIndex = getRandomInteger(0, genres.length - 1);
  return genres[randomIndex];
};

// Функция генерации страны фильма;
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

// Функция генерации кинорежиссера фильма;
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


const getRandomComments = () => {
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
    emotion: `./images/emoji/${emotions[randomIndexEmotion]}.jpg`,
    autor: autors[randomIndexAutor],
    date: generateDateComment(),
    text: commentsText[randomIndexCommentText],
  };
};

const generateCommentsFilm = () => {
  const MIN_COMMENTS_COUNT = 0;
  const MAX_COMMENTS_COUNT = 5;

  return new Array(getRandomInteger(MIN_COMMENTS_COUNT, MAX_COMMENTS_COUNT))
    .fill(null)
    .map(getRandomComments);
};

export const generateFilm = () => {
  const title = generateFilmTitle();

  return {
    title: title,
    originalTitle: 'original title',
    totalRating: getRandomInteger(1, 9).toFixed(1),
    description: generateFilmDescription(),
    poster: `./images/posters/${getFileName(title)}.jpg`,
    director: generateFilmDirector(),
    writers: generateFilmWriters(),
    actors: generateFilmActors(),
    releaseDate: generateDateFilm(),
    runtime: getRandomInteger(45, 360),
    country: generateFilmСountry(),
    genres: generateFilmGenres(),
    ageRating: getRandomInteger(0, 21),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isHistory: Boolean(getRandomInteger(0, 1)),
    isFavorites: Boolean(getRandomInteger(0, 1)),
    comments: generateCommentsFilm(),
  };
};
