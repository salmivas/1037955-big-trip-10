import {
  createElement
} from '../utils.js';

export default class TripCost {
  constructor(sum) {
    this._sum = sum;

    this._element = null;
  }

  getTemplate() {
    return (
      `<p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${this._sum}</span>
      </p>`
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
