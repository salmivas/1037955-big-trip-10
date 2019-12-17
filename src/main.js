import {
  createTripInfo
} from './components/trip-info';
import {
  createTripInfoCost
} from './components/trip-cost.js';
import {
  createTripTabs
} from './components/trip-tabs';
import {
  createTripFilters
} from './components/trip-filter.js';
import {
  createTripSort
} from './components/trip-sort.js';
import {
  createEventItem
} from './components/create-event.js';
import {
  createTripList,
} from './components/trip-list.js';
import {
  generateEvent,
  createDates,
} from './mock/event.js';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripInfo = document.querySelector(`.trip-info`);
render(tripInfo, createTripInfo(), `afterbegin`);

const tripTabs = document.querySelector(`.trip-controls h2:first-child`);
render(tripTabs, createTripTabs(), `afterend`);

const tripControlsFilterElement = document.querySelector(`.trip-controls h2:last-child`);
render(tripControlsFilterElement, createTripFilters(), `afterend`);

const tripEventsElement = document.querySelector(`.trip-events`);
const createEvent = generateEvent();
render(tripEventsElement, createTripSort(), `beforeend`);
render(tripEventsElement, createEventItem(createEvent), `beforeend`);

const dates = createDates(3);

dates.forEach((date, i) => {
  date.dayNumber = ++i;
  render(tripEventsElement, createTripList(date), `beforeend`);
});

const sumTripCost = dates
.slice()
.reduce((sum, current) => {
  return sum + current.events.reduce((evtSum, evtCur) => {
    return evtSum + evtCur.cost;
  }, 0);
}, 0);

render(tripInfo, createTripInfoCost(sumTripCost), `beforeend`);
