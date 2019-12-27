import {
  dateTimeFormat,
  createElement,
  upperName,
} from '../utils.js';

import {
  TRANSFER_TYPES,
  ACTVITY_TYPES,
} from '../const.js';

const createEventActivityTypeItemMarkup = (activityEvent, eventNumber) => {
  return activityEvent
    .map((event) => {
      return (
        `<div class="event__type-item">
          <input id="event-type-${event.toLowerCase()}-${eventNumber}" class="event__type-input  visually-hidden" type="radio" name="event-type"
            value="${event.toLowerCase()}" />
          <label class="event__type-label  event__type-label--${event.toLowerCase()}" for="event-type-${event.toLowerCase()}-${eventNumber}">${event}</label>
        </div>`
      );
    })
    .join(`\n`);
};

const createEventTransferTypeItemMarkup = (transferEvent, eventNumber) => {
  return transferEvent
    .map((event) => {
      return (
        `<div class="event__type-item">
            <input id="event-type-${event.toLowerCase()}-${eventNumber}" class="event__type-input  visually-hidden" type="radio"
              name="event-type" value="${event.toLowerCase()}" />
            <label class="event__type-label  event__type-label--${event.toLowerCase()}"
              for="event-type-${event.toLowerCase()}-${eventNumber}">${event}</label>
          </div>`
      );
    })
    .join(`\n`);
};

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

const createEventItem = (event) => {
  const {
    typeIcon,
    destination,
    photos,
    description,
    date,
    cost,
    extraOptions,
    isEditable,
    eventNumber,
  } = event;

  const eventStartTime = dateTimeFormat(date).dateStart;
  const eventEndTime = dateTimeFormat(date).dateEnd;
  const extraOptionsMarkup = createExtraOptionsMarkup(extraOptions, eventNumber);
  const shortDescription = description.slice(0, 3);
  const eventTitle = `${upperName(typeIcon)}`;
  const transferTypeItem = createEventTransferTypeItemMarkup(TRANSFER_TYPES, eventNumber);
  const activityTypeItem = createEventActivityTypeItemMarkup(ACTVITY_TYPES, eventNumber);
  const editable = {
    formClass: isEditable ? `` : `trip-events__item  `,
    resetBtn: isEditable ? `Delete` : `Cancel`,
    favoriteMarkup: isEditable ? createFavoriteMarkup(eventNumber) : ``,
  };
  const photoMarkup = photos
  .map((photo) => {
    return (
      `<img class="event__photo" src="${photo}" alt="Event photo"></img>`
    );
  })
  .join(`\n`);

  return (
    `<form class="${editable.formClass}event  event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${eventNumber}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${typeIcon}.png" alt="Event type icon" />
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${eventNumber}" type="checkbox" />

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Transfer</legend>

              ${transferTypeItem}
            </fieldset>

            <fieldset class="event__type-group">
              <legend class="visually-hidden">Activity</legend>

              ${activityTypeItem}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${eventNumber}">
          ${eventTitle}
          </label>
          <input
            class="event__input  event__input--destination"
            id="event-destination-${eventNumber}"
            type="text"
            name="event-destination"
            value="${destination}"
            list="destination-list-${eventNumber}"
          />
          <datalist id="destination-list-${eventNumber}">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            <option value="Saint Petersburg"></option>
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${eventNumber}">
            From
          </label>
          <input
            class="event__input  event__input--time"
            id="event-start-time-${eventNumber}"
            type="text"
            name="event-start-time"
            value="${eventStartTime}"
          />
          —
          <label class="visually-hidden" for="event-end-time-${eventNumber}">
            To
          </label>
          <input
            class="event__input  event__input--time"
            id="event-end-time-${eventNumber}"
            type="text"
            name="event-end-time"
            value="${eventEndTime}"
          />
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${eventNumber}">
            <span class="visually-hidden">Price</span>
            €
          </label>
          <input
            class="event__input  event__input--price"
            id="event-price-${eventNumber}"
            type="text"
            name="event-price"
            value="${cost}"
          />
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${editable.resetBtn}</button>
        ${editable.favoriteMarkup}
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>
          <div class="event__available-offers">
            ${extraOptionsMarkup}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">
            ${shortDescription}
          </p>

          <div class="event__photos-container">
            <div class="event__photos-tape">
              ${photoMarkup}
            </div>
          </div>
        </section>
      </section>
    </form>`
  );
};

export default class CreateEvent {
  constructor(event) {
    this.event = event;

    this._element = null;
  }

  getTemplate() {
    return createEventItem(this.event);
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
