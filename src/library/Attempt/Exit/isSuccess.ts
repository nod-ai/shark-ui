import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit_Success,
} from './Success';

import type {
  Attempt_Exit,
} from './definition.declared.ts';

const Attempt_Exit_isSuccess = <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
>(
  givenOutcome: Attempt_Exit<
    SomeProduct,
    SomeActionableError
  >,
): givenOutcome is Attempt_Exit_Success<SomeProduct> => {
  return givenOutcome.discriminant === 'success';
};

export {
  Attempt_Exit_isSuccess,
};
