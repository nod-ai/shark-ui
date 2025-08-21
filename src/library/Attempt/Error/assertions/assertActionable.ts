import type {
  default as Attempt_Error_Actionable,
} from '../ActionableError';

import type Attempt_ErrorInterpreter from '../Interpreter';
import NonActionableBuiltInError from '../NonActionableBuiltInError';

import {
  default as Attempt_Error_NonActionable,
} from '../NonActionableError';

import type {
  AppropriatelyThrown,
} from '../modifier';

import {
  assertPotentiallyActionable,
} from './assertPotentiallyActionable';

const assertActionable = <
  SomeActionableError extends Attempt_Error_Actionable<string>,
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

  return Attempt_Error_NonActionable.rethrow(potentiallyActionableError, {
    message: NonActionableBuiltInError.describes(givenError)
      ? 'Neglected to prevent built-in error'
      : 'Neglected to interpret or prevent potentially actionable error',
  });
};

export {
  assertActionable,
};
