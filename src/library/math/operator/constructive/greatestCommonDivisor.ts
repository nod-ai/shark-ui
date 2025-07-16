import Attempt from '@/library/Attempt';

import {
  isOperable,
} from '../predicate';

const greatestCommonDivisor = (
  leftHandOperand: number,
  rightHandOperand: number,
): number => {
  if (
    !isOperable(leftHandOperand)
  ) return Attempt.abandon('Left operand must be operable.');

  if (
    !isOperable(rightHandOperand)
  ) return Attempt.abandon('Right operand must be operable.');

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
