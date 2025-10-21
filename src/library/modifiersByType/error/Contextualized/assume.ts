import {
  Effect,
} from 'effect';

import type {
  Instantiable,
} from '@/library/typeUtilities';

import type {
  Contextualized,
} from './definition.declared.ts';

import {
  Contextualized_describes,
} from './describes';

const Contextualized_assume = <
  SomeError extends Error,
  SomeCause extends Error,
>(
  givenError: SomeError,
  GivenCause: Instantiable<SomeCause> | ErrorConstructor = Error,
): Contextualized<SomeError, SomeCause> => {
  if (
    Contextualized_describes<SomeError, SomeCause>(givenError, GivenCause)
  ) return givenError;

  return Effect.dieMessage('Expected error to have a cause').pipe(Effect.runSync);
};

export {
  Contextualized_assume,
};
