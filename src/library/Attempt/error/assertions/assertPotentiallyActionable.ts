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
    givenError.rethrownError !== null
  ) return givenError.rethrownError as PotentiallyActionable<SomeError>;

  return givenError.throw();
};

export {
  assertPotentiallyActionable,
};
