import {
  MONTHS,
} from '../const.js';

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const getRandomIntegerNumber = (min, max) => {
  return min + Math.floor(max * Math.random());
};

const shuffleArray = (anyArray) => {
  for (let i = anyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = anyArray[i];
    anyArray[i] = anyArray[j];
    anyArray[j] = temp;
  }
};

const getRandomArrayItem = (array) => {
  const randomIndex = getRandomIntegerNumber(0, array.length);
  shuffleArray(array);
  return array[randomIndex];
};

const upperName = (string) => {
  return string.charAt(0).toUpperCase() + string.substring(1);
};

const dateTimeFormat = (date) => {
  const day = castTimeFormat(date.getDate());
  const month = castTimeFormat(date.getMonth());
  const year = castTimeFormat(date.getFullYear().toString());
  const yearInTwoChars = castTimeFormat(date.getFullYear().toString().slice(2));
  const hours = castTimeFormat(date.getHours());
  const minutes = castTimeFormat(date.getMinutes());

  return {
    eventInputTime: `${day}/${month}/${yearInTwoChars} ${hours}:${minutes}`,
    elementDateTimeAttribute: `${year}-${month}-${day}T${hours}:${minutes}`,
    elementTimeDisplay: `${hours}:${minutes}`,
    monthDay: `${MONTHS[date.getMonth()]} ${day}`,
    yearMonthDate: `${year}-${month}-${day}`,
  };
};

export {
  dateTimeFormat,
  getRandomIntegerNumber,
  shuffleArray,
  getRandomArrayItem,
  upperName,
};
