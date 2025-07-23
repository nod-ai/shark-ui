import Attempt from '@/library/Attempt';

import {
  isWhole,
} from '../predicate';

import {
  absoluteValueOf,
} from './absoluteValueOf';

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

  let nextDividend = leftHandMagnitude;
  let previousRemainder = rightHandMagnitude;

  while (previousRemainder !== 0) {
    const eachDivisor = previousRemainder;
    previousRemainder = nextDividend % eachDivisor;
    nextDividend = eachDivisor;
  }

  return nextDividend;
};

export {
  greatestCommonDivisor,
};
