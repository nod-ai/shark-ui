import Attempt from '@/library/Attempt';

import {
  isFinite,
} from '../predicate';

const greatestCommonDivisor = (
  leftHandOperand: number,
  rightHandOperand: number,
): number => {
  if (
    !isFinite(leftHandOperand)
  ) return Attempt.abandon('Left operand must be finite.');

  if (
    !isFinite(rightHandOperand)
  ) return Attempt.abandon('Right operand must be finite.');

  let nextDividend = leftHandOperand;
  let previousRemainder = rightHandOperand;

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
