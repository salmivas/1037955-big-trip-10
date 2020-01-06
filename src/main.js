import TripInfoComponent from './components/trip-info.js';
import TripTabsComponent from './components/trip-tabs.js';
import TripFilterComponent from './components/trip-filter.js';
import TripController from './controllers/trip-controller.js';
import CostController from './controllers/cost-controller.js';

import {
  createEventDays,
} from './mock/event.js';

import {
  render,
  RenderPosition,
  containersSelector,
} from './utils/render.js';

const DAYS_COUNT = 3;

render(containersSelector.tripInfo(), new TripInfoComponent(), RenderPosition.AFTERBEGIN);

render(containersSelector.AFTERHEADERS.switchMenu(), new TripTabsComponent(), RenderPosition.AFTEREND);

render(containersSelector.AFTERHEADERS.filterEvents(), new TripFilterComponent(), RenderPosition.AFTEREND);

const eventDays = createEventDays(DAYS_COUNT);

const tripController = new TripController(containersSelector.tripEvents());

tripController.render(eventDays);

const costController = new CostController();
costController.render(eventDays);
