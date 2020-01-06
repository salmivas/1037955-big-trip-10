import {
  MONTHS,
} from '../src/const.js';

const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  AFTEREND: `afterend`,
  BEFOREBEGIN: `beforebegin`,
  BEFOREEND: `beforeend`,
};

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
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

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.BEFOREGEGIN:
      container.before(element);
      break;
  }
};


export {
  dateTimeFormat,
  getRandomIntegerNumber,
  shuffleArray,
  getRandomArrayItem,
  upperName,
  RenderPosition,
  createElement,
  render,
};
