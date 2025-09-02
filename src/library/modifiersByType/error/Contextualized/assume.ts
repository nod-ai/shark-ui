import Attempt from '@/library/Attempt';

import type {
  Instantiable,
} from '@/library/typeUtilities';

import type Contextualized from './definition.ts';

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

  return Attempt.abandon('Expected error to have a cause');
};

export {
  Contextualized_assume,
};
