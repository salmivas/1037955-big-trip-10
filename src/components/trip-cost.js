import AbstractComponent from './abstract-component.js';

export default class TripCost extends AbstractComponent {
  constructor(sum) {
    super();

    this._sum = sum;
  }

  getTemplate() {
    return (
      `<p class="trip-info__cost">
        Total: €&nbsp;<span class="trip-info__cost-value">${this._sum}</span>
      </p>`
    );
  }
}
