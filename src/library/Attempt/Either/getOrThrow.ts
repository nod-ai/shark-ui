import type {
  Attempt_Error,
} from '../Error';

import {
  Attempt_Exit,
} from '../Exit';

const Attempt_Either_getOrThrow = <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
>(
  givenOutcome: Attempt_Exit<SomeProduct, SomeActionableError>,
): SomeProduct => {
  return Attempt_Exit.isSuccess(givenOutcome)
    ? givenOutcome.value
    : givenOutcome.cause.throwAnyway('Expected product, got failure instead');
};

export {
  Attempt_Either_getOrThrow,
};
