import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Outcome_Failure,
} from './Failure';

import type {
  Attempt_Outcome,
} from './definition.declared.ts';

const Attempt_Outcome_isFailure = <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
>(
  givenOutcome: Attempt_Outcome<
    SomeProduct,
    SomeActionableError
  >,
): givenOutcome is Attempt_Outcome_Failure<SomeActionableError> => {
  return givenOutcome.discriminant === 'failure';
};

export {
  Attempt_Outcome_isFailure,
};
