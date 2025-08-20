import Attempt_Error_Creation from '../../factory/AttemptCreationError';

import {
  default as Attempt_Error_NonActionable,
} from '../NonActionableError';

import type {
  PotentiallyActionable,
} from '../modifier';

const assertPotentiallyActionable = <
  SomeError extends Error,
>(
  givenError: SomeError,
): PotentiallyActionable<SomeError> => {
  if (
    !(givenError instanceof Attempt_Error_NonActionable)
  ) return givenError as PotentiallyActionable<SomeError>;

  if (
    !(givenError instanceof Attempt_Error_Creation)
    && (givenError.charge !== null)
  ) return givenError.charge as PotentiallyActionable<SomeError>;

  return givenError.throw();
};

export {
  assertPotentiallyActionable,
};
