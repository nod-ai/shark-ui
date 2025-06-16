import {
  NonActionableError,
  type ActionableError,
} from '..';

import type Attempt_ErrorInterpreter from '../Interpreter';

import NonActionableBuiltInError from '../NonActionableBuiltInError';

import {
  assertPotentiallyActionable,
} from '../assertions';

import type {
  AppropriatelyThrown,
} from '../modifier';

const assertActionable = <
  SomeActionableError extends ActionableError<string>,
>(
  givenError: AppropriatelyThrown<Error>,
  {
    using: interpretationOf,
  }: {
    using: Attempt_ErrorInterpreter<SomeActionableError>;
  },
): SomeActionableError => {
  const potentiallyActionableError = assertPotentiallyActionable(givenError);
  const definitelyActionableError = interpretationOf(potentiallyActionableError);

  if (
    definitelyActionableError !== null
  ) return definitelyActionableError;

  if (
    NonActionableBuiltInError.describes(givenError)
  ) throw givenError; // eslint-disable-line no-restricted-syntax -- avoids wrapping built-in errors that are already non-actionable

  return NonActionableError.rethrow(potentiallyActionableError, {
    message: 'Expected error to be either interpreted or prevented altogether',
  });
};

export {
  assertActionable,
};
