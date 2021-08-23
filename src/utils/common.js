// Функция, возвращающая случайное целое число из переданного диапазона включительно;
export const getRandomInteger = (min, max) => (max > min) ? Math.floor(Math.random() * (max - min + 1)) + min : null;

// Функция заменяет один элемент массива на новый;
export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};
