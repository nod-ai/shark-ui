import type {
  Aggregator,
} from './Aggregator';

import {
  sumOf,
} from './sumOf';

const arithmeticMeanOf: Aggregator = (
  ...givenValues
) => sumOf(...givenValues) / givenValues.length;

export {
  arithmeticMeanOf,
};
