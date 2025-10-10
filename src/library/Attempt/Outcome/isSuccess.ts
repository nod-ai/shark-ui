import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Outcome_Success,
} from './Success';

import type {
  Attempt_Outcome,
} from './definition.declared.ts';

const Attempt_Outcome_isSuccess = <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
>(
  givenOutcome: Attempt_Outcome<
    SomeProduct,
    SomeActionableError
  >,
): givenOutcome is Attempt_Outcome_Success<SomeProduct> => {
  return givenOutcome.discriminant === 'success';
};

export {
  Attempt_Outcome_isSuccess,
};
