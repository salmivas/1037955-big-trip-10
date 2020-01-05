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

  const hourSum = Number(hours) + getRandomIntegerNumber(0, 2);
  const minSum = Number(minutes) + getRandomIntegerNumber(0, 58);
  const randomMinutes = minSum > 59 ? 59 : minSum;
  const randomHours = hourSum > 23 ? 23 : hourSum;

  return {
    dateStart: `${day}/${month}/${yearInTwoChars} ${hours}:${minutes}`,
    dateEnd: `${day}/${month}/${yearInTwoChars} ${randomHours}:${randomMinutes}`,
    dateTimeStart: `${year}-${month}-${day}T${hours}:${minutes}`,
    dateTimeEnd: `${year}-${month}-${day}T${randomHours}:${randomMinutes}`,
    timeStart: `${hours}:${minutes}`,
    monthDay: `${MONTHS[date.getMonth()]} ${day}`,
    yearMonthDate: `${year}-${month}-${day}`,
    timeEnd: `${randomHours}:${randomMinutes}`,
    dateDiff: `${parseInt(randomHours, 10) - hours}H ${parseInt(randomMinutes, 10) - minutes}M`,
  };
};

export {
  dateTimeFormat,
  getRandomIntegerNumber,
  shuffleArray,
  getRandomArrayItem,
  upperName,
};
