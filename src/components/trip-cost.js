import {
  createElement
} from '../utils.js';

const createTripInfoCost = (sum) => {
  return (
    `<p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${sum}</span>
    </p>`
  );
};

export default class TripCost {
  constructor(sum) {
    this.sum = sum;

    this._element = null;
  }

  getTemplate() {
    return createTripInfoCost(this.sum);
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
