import {
  dateTimeFormat,
  createElement,
} from '../utils.js';

const createTripDay = (date) => {
  const {
    tripDate, dayNumber,
  } = date;

  const dayDate = dateTimeFormat(tripDate).monthDay;
  const dateTime = dateTimeFormat(tripDate).yearMonthDate;

  return (
    `<li class="trip-days__item  day">
        <div class="day__info">
          <span class="day__counter">${dayNumber}</span>
          <time class="day__date" datetime="${dateTime}">${dayDate}</time>
        </div>

        <ul class="trip-events__list"></ul>
      </li>`
  );
};

export default class TripDay {
  constructor(date) {
    this.date = date;

    this._element = null;
  }

  getTemplate() {
    return createTripDay(this.date);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
