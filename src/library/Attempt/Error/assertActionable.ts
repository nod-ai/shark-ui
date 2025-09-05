import type {
  Attempt_Error_Actionable,
} from './Actionable';

import type {
  Attempt_Error_Interpreter,
} from './Interpreter';

import {
  Attempt_Error_NonActionable,
} from './NonActionable';

import {
  NonActionableBuiltInError,
} from './NonActionableBuiltInError';

import {
  type AppropriatelyThrown,
  PotentiallyActionable_assume,
} from './modifier';

const Attempt_Error_Actionable_from = <
  SomeActionableError extends Attempt_Error_Actionable<string>,
>(
  givenError: AppropriatelyThrown<Error>,
  {
    using: interpretationOf,
  }: {
    using: Attempt_Error_Interpreter<SomeActionableError>;
  },
): SomeActionableError => {
  const potentiallyActionableError = PotentiallyActionable_assume(givenError);
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
  Attempt_Error_Actionable_from,
};
