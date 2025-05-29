import {
  NonActionableError,
  type ActionableError,
} from '..';

import {
  assertPotentiallyActionable,
  assertSafelyPropagated,
} from '../modifier';

const assertActionable = <
  SomeActionableError extends ActionableError<string>, // eslint-disable-line @typescript-eslint/no-unnecessary-type-parameters
>(
  givenError: Error,
): SomeActionableError => {
  const potentiallyActionableError = assertPotentiallyActionable(givenError);
  const safelyPropagatedError = assertSafelyPropagated(potentiallyActionableError);

  return NonActionableError.rethrow(safelyPropagatedError, {
    message: 'Expected error to be either interpreted or prevented altogether',
  });
};

export {
  assertActionable,
};
