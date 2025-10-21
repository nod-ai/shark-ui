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
  ) return Effect.dieMessage('Operand must be operable').pipe(Effect.runSync);

  return (givenOperand < 0);
};

export {
  isNegative,
};
