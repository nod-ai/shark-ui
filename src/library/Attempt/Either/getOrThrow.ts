import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Outcome,
} from '../Outcome';

const Attempt_Either_getOrThrow = <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
>(
  givenOutcome: Attempt_Outcome<SomeProduct, SomeActionableError>,
): SomeProduct => {
  return givenOutcome.getOrThrow();
};

export {
  Attempt_Either_getOrThrow,
};
