import {
  NonActionableError,
  type ActionableError,
} from '..';

import type Attempt_ErrorInterpreter from '../Interpreter';

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
  } = {
    using: () => null,
  },
): SomeActionableError => {
  const potentiallyActionableError = assertPotentiallyActionable(givenError);
  const definitelyActionableError = interpretationOf(potentiallyActionableError);

  if (
    definitelyActionableError !== null
  ) return definitelyActionableError;

  return NonActionableError.rethrow(potentiallyActionableError, {
    message: 'Expected error to be either interpreted or prevented altogether',
  });
};

export {
  assertActionable,
};
