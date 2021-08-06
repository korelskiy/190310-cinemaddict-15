import dayjs from 'dayjs';

export const RenderPosition = {
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
};

export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

// Функция, возвращающая случайное целое число из переданного диапазона включительно;
export const getRandomInteger = (min, max) => (max > min) ? Math.floor(Math.random() * (max - min + 1)) + min : null;

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
