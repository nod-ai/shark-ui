import {
  Cause,
} from 'effect';

import type {
  Attempt_Error,
} from '../Error';

import {
  Attempt_Exit,
} from '../Exit';

const Attempt_Either_getOrThrow = <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable,
>(
  givenExit: Attempt_Exit.Exit<SomeProduct, SomeActionableError>,
): SomeProduct => {
  if (
    Attempt_Exit.isSuccess(givenExit)
  ) return givenExit.value;

  if (
    !Cause.isFailType(givenExit.cause)
  ) return Attempt_Exit.die(`Expected failure, got "${givenExit.cause._tag}" instead`);

  return givenExit.cause.error.throwAnyway('Expected product, got failure instead');
};

export {
  Attempt_Either_getOrThrow,
};
