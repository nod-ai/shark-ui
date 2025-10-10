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
  givenExit: Attempt_Exit<
    SomeProduct,
    SomeActionableError
  >,
): givenExit is Attempt_Exit_Success<SomeProduct> => {
  return givenExit.discriminant === 'success';
};

export {
  Attempt_Exit_isSuccess,
};
