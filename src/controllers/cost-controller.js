import TripCostComponent from '../components/trip-cost.js';
import {
  render,
  RenderPosition,
  containersSelector,
} from '../utils/render.js';

export default class CostController {
  render(eventDays) {
    const sumTripCost = eventDays
      .slice()
      .reduce((sum, current) => {
        return sum + current.events.reduce((evtSum, evtCur) => evtSum + evtCur.cost, 0);
      }, 0);

    render(containersSelector.tripInfo(), new TripCostComponent(sumTripCost), RenderPosition.BEFOREEND);
  }
}
