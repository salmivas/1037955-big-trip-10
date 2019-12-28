const routePoints = new Set([
  `bus`, `check-in`, `drive`, `flight`, `restaurant`, `ship`, `sightseeing`, `taxi`, `train`, `transport`, `trip`,
]);

const MONTHS = [`JAN`, `FEB`, `MAR`, `APR`, `MAY`, `JUN`, `JUL`, `AUG`, `SEP`, `OCT`, `NOV`, `DEC`];

const TRANSFER_TYPES = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`];

const ACTVITY_TYPES = [`Check-in`, `Sightseeing`, `Restaurant`];

export {
  routePoints,
  MONTHS,
  TRANSFER_TYPES,
  ACTVITY_TYPES,
};
