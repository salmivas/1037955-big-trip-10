import AbstractComponent from './abstract-component.js';

import {
  dateTimeFormat,
  upperName,
  getRandomIntegerNumber,
  shuffleArray,
} from '../utils/common.js';

const createOfferMarkup = (extraOptions) => {
  return extraOptions
    .map((offer) => {
      return (
        `<li class="event__offer">
            <span class="event__offer-title">${offer.name}</span>
            +
                          €&nbsp;<span class="event__offer-price">${offer.tax}</span>
          </li>`
      );
    })
    .join(`\n`);
};

export default class TripElement extends AbstractComponent {
  constructor({
    typeIcon, destination, startTime, cost, extraOptions, endTime,
  }) {
    super();

    this._typeIcon = typeIcon;
    this._destination = destination;
    this._startTime = startTime;
    this._endTime = endTime;
    this._cost = cost;
    this._extraOptions = extraOptions;

    this._eventStartTimeDateTime = dateTimeFormat(this._startTime).elementDateTimeAttribute;
    this._eventEndTimeDateTime = dateTimeFormat(this._endTime).elementDateTimeAttribute;
    this._eventStartTime = dateTimeFormat(this._startTime).elementTimeDisplay;
    this._eventEndTime = dateTimeFormat(this._endTime).elementTimeDisplay;
    this._eventDuration = `${endTime.getHours() - startTime.getHours()}H ${endTime.getMinutes() - startTime.getMinutes()}M`;
    this._eventTitle = `${upperName(typeIcon)} ${destination}`;
    shuffleArray(extraOptions);
    this._extraOffers = createOfferMarkup(extraOptions.slice(0, getRandomIntegerNumber(0, 4)));
  }

  getTemplate() {
    return (
      `<li class="trip-events__item">
          <div class="event">
            <div class="event__type">
              <img class="event__type-icon" width="42" height="42" src="img/icons/${this._typeIcon}.png" alt="Event type icon" />
            </div>
            <h3 class="event__title">${this._eventTitle}</h3>

            <div class="event__schedule">
              <p class="event__time">
                <time class="event__start-time" datetime="${this._eventStartTimeDateTime}">${this._eventStartTime}</time>
                —
                        <time class="event__end-time" datetime="${this._eventEndTimeDateTime}">${this._eventEndTime}</time>
              </p>
              <p class="event__duration">${this._eventDuration}</p>
            </div>

            <p class="event__price">
              €&nbsp;
                      <span class="event__price-value">${this._cost}</span>
            </p>

            <h4 class="visually-hidden">Offers:</h4>
            <ul class="event__selected-offers">
              ${this._extraOffers}
            </ul>

            <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
            </button>
          </div>
        </li>`
    );
  }

  setEditButtonClickHandler(handler) {
    this.getElement().querySelector(`.event__rollup-btn`)
      .addEventListener(`click`, handler);
  }
}
