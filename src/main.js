import TripInfoComponent from './components/trip-info.js';
import TripTabsComponent from './components/trip-tabs.js';
import TripFilterComponent from './components/trip-filter.js';
import CreateEventComponent from './components/create-event.js';
import TripSortComponent from './components/trip-sort.js';
import TripCostComponent from './components/trip-cost.js';
import TripDaysComponent from './components/trip-days.js';
import TripDayComponent from './components/trip-day.js';
import TripElementComponent from './components/trip-element.js';

import {
  createEventDays,
} from './mock/event.js';

import {
  render,
  RenderPosition,
} from './utils.js';

const DAYS_COUNT = 3;

const tripInfoElement = document.querySelector(`.trip-info`);
render(tripInfoElement, new TripInfoComponent().getElement(), RenderPosition.AFTERBEGIN);

const tripTabsElement = document.querySelector(`.trip-controls h2:first-child`);
render(tripTabsElement, new TripTabsComponent().getElement(), RenderPosition.AFTEREND);

const tripControlsFilterElement = document.querySelector(`.trip-controls h2:last-child`);
render(tripControlsFilterElement, new TripFilterComponent().getElement(), RenderPosition.AFTEREND);

const tripEventsHeaderElement = document.querySelector(`.trip-events h2`);
render(tripEventsHeaderElement, new TripSortComponent().getElement(), RenderPosition.AFTEREND);

const tripEventsElement = document.querySelector(`.trip-events`);
const tripDaysComponent = new TripDaysComponent().getElement();
render(tripEventsElement, tripDaysComponent, RenderPosition.BEFOREEND);

const tripDaysElement = document.querySelector(`.trip-days`);
const eventDays = createEventDays(DAYS_COUNT);

const renderDay = (date) => {
  render(tripDaysElement, new TripDayComponent(date).getElement(), RenderPosition.BEFOREEND);
};

const renderEvent = (event, listElement) => {
  const eventComponent = new TripElementComponent(event);
  const eventEditComponent = new CreateEventComponent(event);

  const editButton = eventComponent.getElement().querySelector(`.event__rollup-btn`);
  editButton.addEventListener(`click`, () => {
    listElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  });

  const editForm = eventEditComponent.getElement();
  editForm.addEventListener(`submit`, () => {
    listElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  });

  render(listElement, eventComponent.getElement(), RenderPosition.AFTERBEGIN);
};

eventDays.forEach((date, i) => {
  date.dayNumber = ++i;
  renderDay(date);
  const tripEventsList = document.querySelector(`.day:nth-child(${i}) .trip-events__list`);
  date.events
    .forEach((event, j) => {
      event.isEditable = true;
      event.eventNumber = `${i}${j}`;
      renderEvent(event, tripEventsList);
    });
});

const sumTripCost = eventDays
  .slice()
  .reduce((sum, current) => {
    return sum + current.events.reduce((evtSum, evtCur) => evtSum + evtCur.cost, 0);
  }, 0);

render(tripInfoElement, new TripCostComponent(sumTripCost).getElement(), RenderPosition.BEFOREEND);
