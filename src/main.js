import {createRouteElement} from './components/route-element';
import {createSiteMenuTemplate} from './components/site-menu';
import {createFilterTemplate} from './components/filter';
import {createTripSort} from './components/trip-sort';
import {createEventItem} from './components/event';
import {createTripList} from './components/trip-list';

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const tripInfo = document.querySelector(`.trip-info`);
render(tripInfo, createRouteElement(), `afterbegin`);

const tripControlsSwitchElement = document.querySelector(`.trip-controls h2:first-child`);
render(tripControlsSwitchElement, createSiteMenuTemplate(), `afterend`);

const tripControlsFilterElement = document.querySelector(`.trip-controls h2:last-child`);
render(tripControlsFilterElement, createFilterTemplate(), `afterend`);

const tripEventsElement = document.querySelector(`.trip-events`);

[createTripSort, createEventItem, createTripList].forEach((it) => render(tripEventsElement, it(), `beforeend`));
