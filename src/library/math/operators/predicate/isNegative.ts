import {
  Effect,
} from 'effect';

import {
  isOperable,
} from './isOperable';

const isNegative = (
  givenOperand: number,
): boolean => {
  if (
    !isOperable(givenOperand)
  ) return Effect.runSync(Effect.dieMessage('Operand must be operable'));

  return (givenOperand < 0);
};

export {
  isNegative,
};
