import {
  Effect,
} from 'effect';

import {
  isOperable,
} from './isOperable';

const isNegative = (
  givenOperand: number,
): Effect.Effect<boolean> => Effect.gen(function* () {
  if (
    !isOperable(givenOperand)
  ) return yield* Effect.fail(new Error('Operand must be operable'));

  return (givenOperand < 0);
}).pipe(Effect.orDie);

export {
  isNegative,
};
