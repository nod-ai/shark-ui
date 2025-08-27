import Attempt from '@/library/Attempt';

import {
  isWhole,
} from '../predicate';

import {
  absoluteValueOf,
} from './absoluteValueOf/aliases/modulusOf';

const greatestCommonDivisor = (
  leftHandOperand: number,
  rightHandOperand: number,
): number => {
  if (
    !isWhole(leftHandOperand)
  ) return Attempt.abandon('Left operand must be whole.');

  if (
    !isWhole(rightHandOperand)
  ) return Attempt.abandon('Right operand must be whole.');

  const leftHandMagnitude = absoluteValueOf(leftHandOperand);
  const rightHandMagnitude = absoluteValueOf(rightHandOperand);

  if (
    rightHandMagnitude > leftHandMagnitude
  ) return greatestCommonDivisor(rightHandMagnitude, leftHandMagnitude);
  else if (
    rightHandMagnitude !== 0
  ) return greatestCommonDivisor(rightHandMagnitude, leftHandMagnitude % rightHandMagnitude);

  return leftHandMagnitude;
};

/** Alias for {@link greatestCommonDivisor} */
const greatestCommonFactor = greatestCommonDivisor;

/** Alias for {@link greatestCommonDivisor} */
const highestCommonDivisor = greatestCommonDivisor;

/** Alias for {@link greatestCommonDivisor} */
const highestCommonFactor = greatestCommonDivisor;

/** Abbreviation for {@link greatestCommonDivisor} */
const gcd = greatestCommonDivisor;

/** Abbreviation for {@link greatestCommonFactor} */
const gcf = greatestCommonFactor;

export {
  greatestCommonDivisor as default,
  greatestCommonDivisor,
  greatestCommonFactor,
  highestCommonDivisor,
  highestCommonFactor,
  gcd,
  gcf,
};
