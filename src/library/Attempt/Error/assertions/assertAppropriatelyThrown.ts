import {
  default as Attempt_Error_Actionable,
} from '../Actionable';

import type {
  default as AppropriatelyThrown,
} from '../modifier/AppropriatelyThrown';

/**
 * Expects `ActionableError`s to be propagated within the confines of the type system.
 *
 * Using raw `throw` breaches this contract because it prevents the key differentiator between actionable and non-actionable errors.
 */
const assertAppropriatelyThrown = <
  SomeError extends Error,
>(
  givenError: SomeError,
): AppropriatelyThrown<SomeError> => {
  if (
    givenError instanceof Attempt_Error_Actionable
  ) return givenError.throwAnyway('Unexpected raw `throw` of some `ActionableError`. If this was intentional, use `.throwAnyway(...)` on the instance instead.');

  return givenError as AppropriatelyThrown<SomeError>;
};

export {
  assertAppropriatelyThrown,
};
