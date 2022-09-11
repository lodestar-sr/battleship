export const getRandomInt = (max, min = 0) => {
  return min + Math.floor(Math.random() * (max - min));
};

export const getRandomItem = (array: any[]) => {
  return array[getRandomInt(array.length)];
};
