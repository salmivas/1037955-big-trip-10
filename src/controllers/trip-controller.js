import CreateEventComponent from '../components/create-event.js';
import TripDayComponent from '../components/trip-day.js';
import TripElementComponent from '../components/trip-element.js';
import TripSortComponent from '../components/trip-sort.js';
import TripDaysComponent from '../components/trip-days.js';
import NoEventsComponent from '../components/no-events.js';
import {
  render,
  RenderPosition,
  replace,
  containersSelector,
} from '../utils/render.js';

const renderDay = (date) => {
  render(containersSelector.tripDays(), new TripDayComponent(date), RenderPosition.BEFOREEND);
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

export default class TripController {
  constructor(container) {
    this._container = container;

    this._tripSortComponent = new TripSortComponent();
    this._tripDaysComponent = new TripDaysComponent();
    this._noEventsComponent = new NoEventsComponent();
  }

  render(days) {
    if (days.length === 0) {
      render(this._container, this._noEventsComponent, RenderPosition.BEFOREEND);
      return;
    }

    render(containersSelector.AFTERHEADERS.tripEvents(), this._tripSortComponent, RenderPosition.AFTEREND);
    render(this._container, this._tripDaysComponent, RenderPosition.BEFOREEND);

    days.forEach((date, i) => {
      date.dayNumber = ++i;
      renderDay(date);
      date.events
        .forEach((event, j) => {
          event.isEditable = true;
          event.eventNumber = `${i}${j}`;
          renderEvent(event, containersSelector.getTripEventsListSelector(i));
        });
    });


  }
}
