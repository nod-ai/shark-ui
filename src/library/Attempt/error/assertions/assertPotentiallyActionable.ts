import {
  NonActionableError,
} from '..';

import type {
  PotentiallyActionable,
} from '../modifier';

const assertPotentiallyActionable = <
  SomeError extends Error,
>(
  givenError: SomeError,
): PotentiallyActionable<SomeError> => {
  if (
    !(givenError instanceof NonActionableError)
  ) return givenError as PotentiallyActionable<SomeError>;

  if (
    givenError.charge !== null
  ) return givenError.charge as PotentiallyActionable<SomeError>;

  return givenError.throw();
};

export {
  assertPotentiallyActionable,
};
