import Attempt from '@/library/Attempt';

import {
  isFinite,
} from './isFinite';

const isWhole = (
  givenOperand: number,
): boolean => {
  if (
    !isFinite(givenOperand)
  ) return Attempt.abandon('Operand must be finite.');

  return Number.isInteger(givenOperand);
};

/** Alias for {@link isWhole} */
const isInteger = isWhole;

export {
  isWhole,
  isInteger,
};
