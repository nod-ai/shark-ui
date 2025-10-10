import type {
  Attempt_Error,
} from '../Error';

import {
  Attempt_Outcome,
} from '../Exit';

const Attempt_Either_getOrElse = <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
  SomeFallbackProduct,
>(
  givenOutcome: Attempt_Outcome<SomeProduct, SomeActionableError>,
  givenFallbackGetter: () => SomeFallbackProduct,
): SomeProduct | SomeFallbackProduct => {
  return Attempt_Outcome.isSuccess(givenOutcome)
    ? givenOutcome.value
    : givenFallbackGetter();
};

export {
  Attempt_Either_getOrElse,
};
