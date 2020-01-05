import AbstractComponent from './abstract-component.js';

export default class TripInfo extends AbstractComponent {
  getTemplate() {
    return (
      `<div class="trip-info__main">
        <h1 class="trip-info__title">Amsterdam — ... — Amsterdam</h1>

        <p class="trip-info__dates">Mar 18&nbsp;—&nbsp;21</p>
      </div>`
    );
  }
}
