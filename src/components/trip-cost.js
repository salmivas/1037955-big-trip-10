export const createTripInfoCost = (sum) => {
  return (
    `<p class="trip-info__cost">
      Total: €&nbsp;<span class="trip-info__cost-value">${sum}</span>
    </p>`
  );
};
