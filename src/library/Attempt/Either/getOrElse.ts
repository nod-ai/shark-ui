import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Outcome,
} from '../Outcome';

const Attempt_Either_getOrElse = <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
  SomeFallbackProduct,
>(
  givenOutcome: Attempt_Outcome<SomeProduct, SomeActionableError>,
  givenFallbackGetter: () => SomeFallbackProduct,
): SomeProduct | SomeFallbackProduct => {
  return givenOutcome.getOrElse(givenFallbackGetter);
};

export {
  Attempt_Either_getOrElse,
};
