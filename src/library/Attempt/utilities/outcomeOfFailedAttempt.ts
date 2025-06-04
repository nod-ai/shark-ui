import {
  asError,
} from '@/library/utilitiesByType/error';

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
    basedOn: givenSubject,
  }: {
    basedOn: unknown;
  },
): Outcome<SomeProduct, SomeActionableError> => {
  const someError = asError(givenSubject);
  const potentiallyActionableError = assertPotentiallyActionable(someError);
  const safelyPropagatedError = assertSafelyPropagated(potentiallyActionableError);

  return NonActionableError.rethrow(safelyPropagatedError, {
    message: 'Expected error to be either interpreted or prevented altogether',
  });
};

export {
  outcomeOfFailedAttempt,
};
