import TripInfoComponent from './components/trip-info.js';
import TripTabsComponent from './components/trip-tabs.js';
import TripFilterComponent from './components/trip-filter.js';
import CreateEventComponent from './components/create-event.js';
import TripSortComponent from './components/trip-sort.js';
import TripCostComponent from './components/trip-cost.js';
import TripListComponent from './components/trip-list.js';
import {
  generateEvent,
  createDates,
} from './mock/event.js';

import {
  render,
  RenderPosition
} from './utils.js';

const tripInfoElement = document.querySelector(`.trip-info`);
render(tripInfoElement, new TripInfoComponent().getElement(), RenderPosition.AFTERBEGIN);

const tripTabsElement = document.querySelector(`.trip-controls h2:first-child`);
render(tripTabsElement, new TripTabsComponent().getElement(), RenderPosition.AFTEREND);

const tripControlsFilterElement = document.querySelector(`.trip-controls h2:last-child`);
render(tripControlsFilterElement, new TripFilterComponent().getElement(), RenderPosition.AFTEREND);

const tripEventsHeaderElement = document.querySelector(`.trip-events h2`);
render(tripEventsHeaderElement, new TripSortComponent().getElement(), RenderPosition.AFTEREND);

// -----Creating a route-point-----
// const createEvent = generateEvent();
// const tripSortElement = document.querySelector(`.trip-sort`);
// render(tripSortElement, new CreateEventComponent(createEvent).getElement(), RenderPosition.AFTEREND);

const tripEventsElement = document.querySelector(`.trip-events`);
const dates = createDates(3);

dates.forEach((date, i) => {
  date.dayNumber = ++i;
  render(tripEventsElement, new TripListComponent(date).getElement(), RenderPosition.BEFOREEND);
});

const sumTripCost = dates
  .slice()
  .reduce((sum, current) => {
    return sum + current.events.reduce((evtSum, evtCur) => {
      return evtSum + evtCur.cost;
    }, 0);
  }, 0);

render(tripInfoElement, new TripCostComponent(sumTripCost).getElement(), RenderPosition.BEFOREEND);
