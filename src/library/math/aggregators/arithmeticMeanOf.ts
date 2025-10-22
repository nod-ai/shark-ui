import {
  sumAll,
} from 'effect/Number';

import type {
  Aggregator,
} from './Aggregator';

const arithmeticMeanOf: Aggregator = (
  ...givenValues
) => sumAll(givenValues) / givenValues.length;

export {
  arithmeticMeanOf,
};
