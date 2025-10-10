import type {
  Attempt_Error,
} from '../Error';

import {
  Attempt_Exit,
} from '../Exit';

const Attempt_Either_getOrElse = <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
  SomeFallbackProduct,
>(
  givenOutcome: Attempt_Exit<SomeProduct, SomeActionableError>,
  givenFallbackGetter: () => SomeFallbackProduct,
): SomeProduct | SomeFallbackProduct => {
  return Attempt_Exit.isSuccess(givenOutcome)
    ? givenOutcome.value
    : givenFallbackGetter();
};

export {
  Attempt_Either_getOrElse,
};
