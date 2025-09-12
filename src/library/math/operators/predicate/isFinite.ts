import Attempt from '@/library/Attempt';

import {
  isOperable,
} from './isOperable';

const isFinite = (
  givenOperand: number,
): boolean => {
  if (
    !isOperable(givenOperand)
  ) return Attempt.abandon('Operand must be operable.');

  return Number.isFinite(givenOperand);
};

export {
  isFinite,
};
