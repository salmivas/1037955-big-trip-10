import {
  dateTimeFormat,
  createElement,
} from '../utils.js';

export default class TripDay {
  constructor({
    tripDate,
    dayNumber,
  }) {
    this._tripDate = tripDate;
    this._dayNumber = dayNumber;
    this._dayDate = dateTimeFormat(this._tripDate).monthDay;
    this._dateTime = dateTimeFormat(this._tripDate).yearMonthDate;

    this._element = null;
  }

  getTemplate() {
    return (
      `<li class="trip-days__item  day">
          <div class="day__info">
            <span class="day__counter">${this._dayNumber}</span>
            <time class="day__date" datetime="${this._dateTime}">${this._dayDate}</time>
          </div>

          <ul class="trip-events__list"></ul>
        </li>`
    );
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
