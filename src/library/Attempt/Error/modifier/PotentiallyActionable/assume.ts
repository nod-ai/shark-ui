import {
  _default as Attempt_Error_Creation,
} from '../../Creation';

import {
  _default as Attempt_Error_NonActionable,
} from '../../NonActionable';

import type {
  _default as PotentiallyActionable,
} from './definition.ts';

const PotentiallyActionable_assume = <
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
  PotentiallyActionable_assume,
};
