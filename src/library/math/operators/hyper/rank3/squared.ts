import Attempt from '@/library/Attempt';

import {
  isOperable,
} from '../../predicate';

const squared = (
  givenOperand: number,
): number => {
  if (
    !isOperable(givenOperand)
  ) return Attempt.abandon('Operand must be operable.');

  return givenOperand ** 2;
};

export {
  squared,
};
