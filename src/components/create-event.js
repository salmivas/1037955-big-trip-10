import AbstractComponent from './abstract-component.js';
import {
  dateTimeFormat,
  upperName,
} from '../utils/common.js';

import {
  TRANSFER_TYPES,
  ACTVITY_TYPES,
} from '../const.js';

const createFavoriteMarkup = (eventNumber) => {
  return (
    `<input id="event-favorite-${eventNumber}" class="event__favorite-checkbox  visually-hidden" type="checkbox" name="event-favorite"
      checked="">
    <label class="event__favorite-btn" for="event-favorite-${eventNumber}">
      <span class="visually-hidden">Add to favorite</span>
      <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
        <path
          d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z">
        </path>
      </svg>
    </label>

    <button class="event__rollup-btn" type="button">
      <span class="visually-hidden">Open event</span>
    </button>`
  );
};

const createExtraOptionsMarkup = (extraOptions, eventNumber) => {
  return extraOptions
    .map((option) => {
      return (
        `<div class="event__offer-selector">
            <input
              class="event__offer-checkbox  visually-hidden"
              id="event-offer-${option.suffix}-${eventNumber}"
              type="checkbox"
              name="event-offer-${option.suffix}"
              ${option.isChecked}
            />
            <label class="event__offer-label" for="event-offer-${option.suffix}-${eventNumber}">
              <span class="event__offer-title">${option.name}</span>
              + €&nbsp;
              <span class="event__offer-price">${option.tax}</span>
            </label>
          </div>`
      );
    })
    .join(`\n`);
};

export default class CreateEvent extends AbstractComponent {
  constructor({
    typeIcon, destination, photos, description, date, cost, extraOptions, isEditable, eventNumber
  }) {
    super();

    this._typeIcon = typeIcon;
    this._destination = destination;
    this._photos = photos;
    this._description = description;
    this._date = date;
    this._cost = cost;
    this._extraOptions = extraOptions;
    this._isEditable = isEditable;
    this._eventNumber = eventNumber;

    this._eventStartTime = dateTimeFormat(this._date).dateStart;
    this._eventEndTime = dateTimeFormat(this._date).dateEnd;
    this._extraOptionsMarkup = createExtraOptionsMarkup(this._extraOptions, this._eventNumber);
    this._shortDescription = this._description.slice(0, 3);
    this._eventTitle = `${upperName(this._typeIcon)}`;
    this._editable = {
      formClass: this._isEditable ? `` : `trip-events__item  `,
      resetBtn: this._isEditable ? `Delete` : `Cancel`,
      favoriteMarkup: this._isEditable ? createFavoriteMarkup(this._eventNumber) : ``,
    };
  }

  getTemplate() {
    return (
      `<form class="${this._editable.formClass}event  event--edit" action="#" method="post">
        <header class="event__header">
          <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-${this._eventNumber}">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${this._typeIcon}.png" alt="Event type icon" />
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${this._eventNumber}" type="checkbox" />

            <div class="event__type-list">
              <fieldset class="event__type-group">
                <legend class="visually-hidden">Transfer</legend>
                  ${TRANSFER_TYPES
        .map((event) => {
          return (
            `<div class="event__type-item">
                <input id="event-type-${event.toLowerCase()}-${this._eventNumber}" class="event__type-input  visually-hidden" type="radio"
                  name="event-type" value="${event.toLowerCase()}" />
                <label class="event__type-label  event__type-label--${event.toLowerCase()}"
                  for="event-type-${event.toLowerCase()}-${this._eventNumber}">${event}</label>
              </div>`);
        })
        .join(``)}

              </fieldset>

              <fieldset class="event__type-group">
                <legend class="visually-hidden">Activity</legend>
                ${ACTVITY_TYPES
        .map((event) => {
          return (
            `<div class="event__type-item">
                <input id="event-type-${event.toLowerCase()}-${this._eventNumber}" class="event__type-input  visually-hidden" type="radio" name="event-type"
                  value="${event.toLowerCase()}" />
                <label class="event__type-label  event__type-label--${event.toLowerCase()}" for="event-type-${event.toLowerCase()}-${this._eventNumber}">${event}</label>
              </div>`
          );
        })
        .join(``)}

              </fieldset>
            </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-${this._eventNumber}">
            ${this._eventTitle}
            </label>
            <input
              class="event__input  event__input--destination"
              id="event-destination-${this._eventNumber}"
              type="text"
              name="event-destination"
              value="${this._destination}"
              list="destination-list-${this._eventNumber}"
            />
            <datalist id="destination-list-${this._eventNumber}">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
              <option value="Saint Petersburg"></option>
            </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-${this._eventNumber}">
              From
            </label>
            <input
              class="event__input  event__input--time"
              id="event-start-time-${this._eventNumber}"
              type="text"
              name="event-start-time"
              value="${this._eventStartTime}"
            />
            —
            <label class="visually-hidden" for="event-end-time-${this._eventNumber}">
              To
            </label>
            <input
              class="event__input  event__input--time"
              id="event-end-time-${this._eventNumber}"
              type="text"
              name="event-end-time"
              value="${this._eventEndTime}"
            />
          </div>

          <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-${this._eventNumber}">
              <span class="visually-hidden">Price</span>
              €
            </label>
            <input
              class="event__input  event__input--price"
              id="event-price-${this._eventNumber}"
              type="text"
              name="event-price"
              value="${this._cost}"
            />
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">${this._editable.resetBtn}</button>
          ${this._editable.favoriteMarkup}
        </header>
        <section class="event__details">
          <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${this._extraOptionsMarkup}
            </div>
          </section>

          <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">
              ${this._shortDescription}
            </p>

            <div class="event__photos-container">
              <div class="event__photos-tape">
                ${this._photos
        .map((photo) => `<img class="event__photo" src="${photo}" alt="Eventphoto"></img>`)
        .join(``)}
              </div>
            </div>
          </section>
        </section>
      </form>`
    );
  }

  setSubmitHandler(handler) {
    this.getElement()
      .addEventListener(`submit`, handler);
  }
}
