import {
  NonActionableError,
  type ActionableError,
} from '..';

import HonoraryNonActionableError from '../HonoraryNonActionableError';

import {
  type AppropriatelyThrown,
  assertPotentiallyActionable,
} from '../modifier';

const assertActionable = <
  SomeActionableError extends ActionableError<string>, // eslint-disable-line @typescript-eslint/no-unnecessary-type-parameters
>(
  givenError: AppropriatelyThrown<Error>,
): SomeActionableError => {
  const potentiallyActionableError = assertPotentiallyActionable(givenError);

  if (
    HonoraryNonActionableError.describes(potentiallyActionableError)
  ) throw potentiallyActionableError; // eslint-disable-line no-restricted-syntax

  return NonActionableError.rethrow(potentiallyActionableError, {
    message: 'Expected error to be either interpreted or prevented altogether',
  });
};

export {
  assertActionable,
};
