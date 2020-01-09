import AbstractComponent from './abstract-component.js';
import {
  dateTimeFormat,
} from '../utils/common.js';

export default class TripDay extends AbstractComponent {
  constructor({
    tripDate,
    dayNumber,
  }, isBlank = false) {
    super();

    this._isBlank = isBlank;
    this._tripDate = tripDate;
    this._dayNumber = dayNumber;
    this._dayDate = !isBlank ? dateTimeFormat(this._tripDate).monthDay : null;
    this._dateTime = !isBlank ? dateTimeFormat(this._tripDate).yearMonthDate : null;
  }

  getTemplate() {
    if (this._isBlank) {
      return (
        `<li class="trip-days__item  day">
              <div class="day__info"></div>
            <ul class="trip-events__list"></ul>
        </li>`);
    } else {
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
  }
}
