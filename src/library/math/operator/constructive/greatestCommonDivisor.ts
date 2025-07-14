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

  if (
    rightHandMagnitude > leftHandMagnitude
  ) return greatestCommonDivisor(rightHandMagnitude, leftHandMagnitude);
  else if (
    rightHandMagnitude !== 0
  ) return greatestCommonDivisor(rightHandMagnitude, leftHandMagnitude % rightHandMagnitude);

  return leftHandMagnitude;
};

export {
  greatestCommonDivisor as default,
  greatestCommonDivisor,
};
