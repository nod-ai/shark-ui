import type {
  Attempt_Error,
} from '../Error';

import {
  Attempt_Outcome,
} from '../Outcome';

const Attempt_Either_getOrThrow = <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
>(
  givenOutcome: Attempt_Outcome<SomeProduct, SomeActionableError>,
): SomeProduct => {
  return Attempt_Outcome.isSuccess(givenOutcome)
    ? givenOutcome.value
    : givenOutcome.cause.throwAnyway('Expected product, got failure instead');
};

export {
  Attempt_Either_getOrThrow,
};
