import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit_Exit,
} from './Exit';

import type {
  Attempt_Exit_Success,
} from './Success';

const Attempt_Exit_isSuccess = <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable,
>(
  givenExit: Attempt_Exit_Exit<
    SomeProduct,
    SomeActionableError
  >,
): givenExit is Attempt_Exit_Success<SomeProduct> => {
  return givenExit.discriminant === 'success';
};

export {
  Attempt_Exit_isSuccess,
};
