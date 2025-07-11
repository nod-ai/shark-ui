import Attempt from '@/library/Attempt';

import {
  isWhole,
} from '../predicate';

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
