import {
  Cause,
  Effect,
  Exit,
} from 'effect';

import type {
  Attempt_Error,
} from '../Error';

const Attempt_Either_getOrThrow = <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable,
>(
  givenExit: Exit.Exit<SomeProduct, SomeActionableError>,
): SomeProduct => {
  if (
    Exit.isSuccess(givenExit)
  ) return givenExit.value;

  if (
    !Cause.isFailType(givenExit.cause)
  ) return Effect.runSync(Effect.dieMessage(`Expected failure, got "${givenExit.cause._tag}" instead`));

  return givenExit.cause.error.throwAnyway('Expected product, got failure instead');
};

export {
  Attempt_Either_getOrThrow,
};
