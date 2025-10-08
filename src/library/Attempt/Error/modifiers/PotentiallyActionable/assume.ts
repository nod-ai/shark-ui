import {
  Option,
} from 'effect';

import {
  Attempt_Error_Creation,
} from '../../Creation';

import {
  Attempt_Error_NonActionable,
} from '../../NonActionable';

import type {
  PotentiallyActionable,
} from './definition.declared.ts';

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
    && Option.isSome(givenError.charge)
  ) return Option.getOrThrow(givenError.charge) as PotentiallyActionable<SomeError>;

  return givenError.throw();
};

export {
  PotentiallyActionable_assume,
};
