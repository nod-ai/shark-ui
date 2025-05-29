import {
  NonActionableError,
  type ActionableError,
} from '..';

import {
  assertPotentiallyActionable,
} from '../assertions';

import type {
  AppropriatelyThrown,
} from '../modifier';

const assertActionable = <
  SomeActionableError extends ActionableError<string>, // eslint-disable-line @typescript-eslint/no-unnecessary-type-parameters
>(
  givenError: AppropriatelyThrown<Error>,
): SomeActionableError => {
  const potentiallyActionableError = assertPotentiallyActionable(givenError);

  return NonActionableError.rethrow(potentiallyActionableError, {
    message: 'Expected error to be either interpreted or prevented altogether',
  });
};

export {
  assertActionable,
};
