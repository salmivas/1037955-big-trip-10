import {
  routePoints,
} from '../const.js';

import {
  getRandomIntegerNumber,
  shuffleArray,
  getRandomArrayItem,
} from '../utils.js';

const CITIES = [
  `London`,
  `Amsterdam`,
  `Oslo`,
  `Dublin`,
  `Paris`,
  `Berlin`,
  `Helsinki`,
  `Warsaw`,
  `Rome`,
  `Lubliana`,
];

const DESTINATION_DESCRIPTION = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
];

const EXTRA_OPTIONS = [
  {
    name: `Add luggage`,
    suffix: `luggage`,
    tax: 10,
  },
  {
    name: `Switch to comfort class`,
    suffix: `comfort`,
    tax: 150,
  },
  {
    name: `Add meal`,
    suffix: `meal`,
    tax: 2,
  },
  {
    name: `Choose seats`,
    suffix: `seats`,
    tax: 9,
  },
];

const NUMBER_OF_EVENTS_PER_DAY = 4;

const getRandomDate = () => {
  const targetDate = new Date();
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomIntegerNumber(0, 7);

  targetDate.setDate(targetDate.getDate() + diffValue);

  return targetDate;
};

const getRandomPhotoArray = () => {
  let photoURLs = new Set();
  for (let i = 0; i < getRandomIntegerNumber(1, 5); i++) {
    photoURLs.add(`http://picsum.photos/300/150?r=${Math.random()}`);
  }
  return photoURLs;
};

const getRandomActiveOptions = (options) => {
  for (const option of options) {
    option[`isChecked`] = Math.floor(Math.random() * 2) ? `checked` : ``;
  }
};

const generateEvent = (time = getRandomDate()) => {
  shuffleArray(DESTINATION_DESCRIPTION);
  getRandomActiveOptions(EXTRA_OPTIONS);
  return {
    typeIcon: getRandomArrayItem(Array.from(routePoints)),
    destination: getRandomArrayItem(CITIES),
    photos: Array.from(getRandomPhotoArray()),
    description: DESTINATION_DESCRIPTION,
    date: time,
    cost: getRandomIntegerNumber(1, 1000),
    extraOptions: EXTRA_OPTIONS,
    isEditable: false,
    eventNumber: 0,
  };
};

const createDate = () => {
  const randomTime = getRandomDate();

  return {
    dayNumber: 0,
    tripDate: randomTime,
    events: generateEvents(NUMBER_OF_EVENTS_PER_DAY, randomTime),
  };
};

const generateEvents = (count, time) => {
  return new Array(count)
    .fill(``)
    .map(generateEvent.bind(null, time));
};

const createEventDays = (count) => {
  return new Array(count)
    .fill(``)
    .map(createDate)
    .sort((a, b) => a.tripDate - b.tripDate);
};

export {
  generateEvent,
  generateEvents,
  getRandomIntegerNumber,
  createDate,
  createEventDays,
};
