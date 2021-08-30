// Функция, возвращающая случайное целое число из переданного диапазона включительно;
export const getRandomInteger = (min, max) => (max > min) ? Math.floor(Math.random() * (max - min + 1)) + min : null;

