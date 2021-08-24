import dayjs from 'dayjs';
import {getRandomInteger} from './common.js';

// Функция генерации случайной даты;
export const generateDate = (minGap, maxGap, format) => {
  const randomGap = getRandomInteger(minGap, maxGap);
  return dayjs().subtract(randomGap, format).toDate();
};

// Конвертер времени в формат "hh mm";
export const timeConvert = (time) => {
  const hours = (time / 60);
  const roundingHours = Math.floor(hours);
  const minutes = (hours - roundingHours) * 60;
  const roundingMinutes = Math.round(minutes);
  return  `${roundingHours}h ${roundingMinutes}m`;
};

// Конвертер времени через dayjs;
export const getFormatData = (date, format) => dayjs(date).format(format);


export const sortFilmUp = (filmA, filmB) => dayjs(filmB.release.date).diff(dayjs(filmA.release.date));
export const sortFilmRating = (second, first) => first.totalRating - second.totalRating;
