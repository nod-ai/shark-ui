import {
  NonActionableError,
  type ActionableError,
} from '..';

import type Attempt_ErrorInterpreter from '../Interpreter';
import NonActionableBuiltInError from '../NonActionableBuiltInError';

import type {
  AppropriatelyThrown,
} from '../modifier';

import {
  assertPotentiallyActionable,
} from './assertPotentiallyActionable';

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

  return NonActionableError.rethrow(potentiallyActionableError, {
    message: NonActionableBuiltInError.describes(givenError)
      ? 'Neglected to prevent built-in error'
      : 'Neglected to interpret or prevent potentially actionable error',
  });
};

export {
  assertActionable,
};
