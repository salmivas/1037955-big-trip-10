import CreateEventComponent from '../components/create-event.js';
import TripDayComponent from '../components/trip-day.js';
import TripElementComponent from '../components/trip-element.js';
import TripDaysComponent from '../components/trip-days.js';
import NoEventsComponent from '../components/no-events.js';
import TripSortComponent, {
  SortType
} from '../components/trip-sort.js';
import {
  render,
  RenderPosition,
  replace,
  containersSelector,
} from '../utils/render.js';

const renderDay = (date, isBlank) => {
  render(containersSelector.tripDays(), new TripDayComponent(date, isBlank), RenderPosition.BEFOREEND);
};

const renderEvent = (event, listElement) => {
  const onEscDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      replaceEditToEvent();
      document.removeEventListener(`keydown`, onEscDown);
    }
  };

  const replaceEventToEdit = () => {
    replace(eventEditComponent, eventComponent);
  };

  const replaceEditToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const eventComponent = new TripElementComponent(event);
  eventComponent.setEditButtonClickHandler(() => {
    replaceEventToEdit();
    document.addEventListener(`keydown`, onEscDown);
  });

  const eventEditComponent = new CreateEventComponent(event);
  eventEditComponent.setSubmitHandler(replaceEditToEvent);

  render(listElement, eventComponent, RenderPosition.AFTERBEGIN);
};

const renderTripDays = (dataToRender) => {
  if (!dataToRender[0].dayNumber) {
    renderDay({}, true);
    dataToRender.forEach((event) => {
      renderEvent(event, containersSelector.getTripEventsListSelector(1));
    });
  } else {
    dataToRender.forEach((date) => {
      renderDay(date, false);
      date.events.forEach((event) => {
        renderEvent(event, containersSelector.getTripEventsListSelector(date.dayNumber));
      });
    });
  }
};


export default class TripController {
  constructor(container) {
    this._container = container;

    this._tripSortComponent = new TripSortComponent();
    this._tripDaysComponent = new TripDaysComponent();
    this._noEventsComponent = new NoEventsComponent();
  }

  render(eventsData) {
    if (eventsData.length === 0) {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    } else {
      eventsData.forEach((date, i) => {
        date.dayNumber = ++i;
        date.events.forEach((event, j) => {
          event.isEditable = true;
          event.eventNumber = `${i}${j}`;
        });
      });
    }

    render(containersSelector.AFTERHEADERS.tripEvents(), this._tripSortComponent, RenderPosition.AFTEREND);
    render(this._container, this._tripDaysComponent, RenderPosition.BEFOREEND);

    renderTripDays(eventsData);
    this._tripSortComponent.sortTypeChangeHandler((sortType) => {
      let sortedEvents = [];

      switch (sortType) {
        case SortType.TIME_DOWN:
          sortedEvents = eventsData.slice()
            .map((day) => day.events).flat()
            .sort((a, b) => ((b.endTime - b.startTime) - (a.endTime - a.startTime)));
          break;
        case SortType.PRICE_DOWN:
          sortedEvents = eventsData.slice()
            .map((day) => day.events).flat()
            .sort((a, b) => b.cost - a.cost);
          break;
        case SortType.DEFAULT_EVENT:
          sortedEvents = eventsData;
          break;
      }

      this._tripDaysComponent.getElement().innerHTML = ``;

      renderTripDays(sortedEvents);
    });
  }
}
