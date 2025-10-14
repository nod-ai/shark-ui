import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit_Exit,
} from './Exit';

import type {
  Attempt_Exit_Failure,
} from './Failure';

const Attempt_Exit_isFailure = <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
>(
  givenExit: Attempt_Exit_Exit<
    SomeProduct,
    SomeActionableError
  >,
): givenExit is Attempt_Exit_Failure<SomeActionableError> => {
  return givenExit.discriminant === 'failure';
};

export {
  Attempt_Exit_isFailure,
};
