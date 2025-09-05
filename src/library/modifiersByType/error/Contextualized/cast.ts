import type {
  Instantiable,
} from '@/library/typeUtilities';

import {
  Contextualized_assume,
} from './assume';

import type {
  Contextualized,
} from './definition.ts';

import {
  Contextualized_describes,
} from './describes';

const Contextualized_cast = <
  SomeError extends Error,
  SomeCause extends Error,
>(
  givenError: SomeError,
  givenFallbackMessage: string,
  GivenCause: Instantiable<SomeCause> | ErrorConstructor = Error,
): Contextualized<SomeError, SomeCause> | Contextualized<Error, SomeError> => {
  if (
    Contextualized_describes<SomeError, SomeCause>(givenError, GivenCause)
  ) return givenError;

  const contextualizedError = new Error(givenFallbackMessage, {
    cause: givenError,
  });

  return Contextualized_assume<Error, SomeError>(contextualizedError, Error);
};

export {
  Contextualized_cast,
};
