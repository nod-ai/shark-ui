import type {
  NonEmptyArray,
} from 'effect/Array';

import {
  sumAll,
} from 'effect/Number';

const arithmeticMeanOf = (
  ...givenValues: NonEmptyArray<number>
): number => sumAll(givenValues) / givenValues.length;

export {
  arithmeticMeanOf,
};
