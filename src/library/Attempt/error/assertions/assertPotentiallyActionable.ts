import Attempt_CreationError from '../../factory/AttemptCreationError';

import {
  default as Attempt_NonActionableError,
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
    !(givenError instanceof Attempt_NonActionableError)
  ) return givenError as PotentiallyActionable<SomeError>;

  if (
    !(givenError instanceof Attempt_CreationError)
    && (givenError.charge !== null)
  ) return givenError.charge as PotentiallyActionable<SomeError>;

  return givenError.throw();
};

export {
  assertPotentiallyActionable,
};
