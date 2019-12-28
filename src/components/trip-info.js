import {
  createElement
} from '../utils.js';

export default class TripInfo {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return (
      `<div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam — ... — Amsterdam</h1>

        <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;21</p>
      </div>`
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
