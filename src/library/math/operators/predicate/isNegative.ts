import Attempt from '@/library/Attempt';

import {
  isOperable,
} from './isOperable';

const isNegative = (
  givenOperand: number,
): boolean => {
  if (
    !isOperable(givenOperand)
  ) return Attempt.Exit.die('Operand must be operable');

  return (givenOperand < 0);
};

export {
  isNegative,
};
