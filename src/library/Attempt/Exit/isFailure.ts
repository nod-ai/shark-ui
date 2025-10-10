import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit_Failure,
} from './Failure';

import type {
  Attempt_Exit,
} from './definition.declared.ts';

const Attempt_Exit_isFailure = <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
>(
  givenOutcome: Attempt_Exit<
    SomeProduct,
    SomeActionableError
  >,
): givenOutcome is Attempt_Exit_Failure<SomeActionableError> => {
  return givenOutcome.discriminant === 'failure';
};

export {
  Attempt_Exit_isFailure,
};
