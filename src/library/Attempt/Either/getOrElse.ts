import {
  Exit,
} from 'effect';

import type {
  Attempt_Error,
} from '../Error';

const Attempt_Either_getOrElse = <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable,
  SomeFallbackProduct,
>(
  givenExit: Exit.Exit<SomeProduct, SomeActionableError>,
  givenFallbackGetter: () => SomeFallbackProduct,
): SomeProduct | SomeFallbackProduct => {
  return Exit.isSuccess(givenExit)
    ? givenExit.value
    : givenFallbackGetter();
};

export {
  Attempt_Either_getOrElse,
};
