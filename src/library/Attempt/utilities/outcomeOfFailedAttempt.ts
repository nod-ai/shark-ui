import type Outcome from '../Outcome';

import {
  NonActionableError,
  type ActionableError,
} from '../error';

import {
  assertPotentiallyActionable,
  assertSafelyPropagated,
} from '../error/modifier';

const outcomeOfFailedAttempt = <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  {
    basedOn: givenError,
  }: {
    basedOn: Error;
  },
): Outcome<SomeProduct, SomeActionableError> => {
  const potentiallyActionableError = assertPotentiallyActionable(givenError);
  const safelyPropagatedError = assertSafelyPropagated(potentiallyActionableError);

  return NonActionableError.rethrow(safelyPropagatedError, {
    message: 'Expected error to be either interpreted or prevented altogether',
  });
};

export {
  outcomeOfFailedAttempt,
};
