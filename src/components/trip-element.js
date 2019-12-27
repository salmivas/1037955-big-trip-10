import {
  dateTimeFormat,
  upperName,
  getRandomIntegerNumber,
  shuffleArray,
  createElement,
} from '../utils.js';

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

const createTripElement = (event) => {
  const {
    typeIcon, destination, date, cost, extraOptions
  } = event;

  const eventStartTimeDateTime = dateTimeFormat(date).dateTimeStart;
  const eventEndTimeDateTime = dateTimeFormat(date).dateTimeEnd;
  const eventStartTime = dateTimeFormat(date).timeStart;
  const eventEndTime = dateTimeFormat(date).timeEnd;
  const eventDuration = dateTimeFormat(date).dateDiff;
  const eventTitle = `${upperName(typeIcon)} ${destination}`;
  shuffleArray(extraOptions);
  const extraOffers = createOfferMarkup(extraOptions.slice(0, getRandomIntegerNumber(0, 4)));

  return (
    `<li class="trip-events__item">
        <div class="event">
          <div class="event__type">
            <img class="event__type-icon" width="42" height="42" src="img/icons/${typeIcon}.png" alt="Event type icon" />
          </div>
          <h3 class="event__title">${eventTitle}</h3>

          <div class="event__schedule">
            <p class="event__time">
              <time class="event__start-time" datetime="${eventStartTimeDateTime}">${eventStartTime}</time>
              —
                      <time class="event__end-time" datetime="${eventEndTimeDateTime}">${eventEndTime}</time>
            </p>
            <p class="event__duration">${eventDuration}</p>
          </div>

          <p class="event__price">
            €&nbsp;
                    <span class="event__price-value">${cost}</span>
          </p>

          <h4 class="visually-hidden">Offers:</h4>
          <ul class="event__selected-offers">
            ${extraOffers}
          </ul>

          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        </div>
      </li>`
  );
};

export default class TripElement {
  constructor(event) {
    this.event = event;

    this._element = null;
  }

  getTemplate() {
    return createTripElement(this.event);
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
