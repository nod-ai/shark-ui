import Attempt from '@/library/Attempt';

import type {
  Instantiable,
} from '@/library/typeUtilities';

type Contextualized<
  SomeError extends Error,
  SomeCause extends Error,
> =
  & SomeError
  & {
    cause: SomeCause;
  }
;

const Contextualized_describes = <
  SomeError extends Error,
  SomeCause extends Error,
>(
  givenError: SomeError,
  GivenCause: Instantiable<SomeCause> | ErrorConstructor = Error,
): givenError is Contextualized<SomeError, SomeCause> => {
  return givenError.cause instanceof GivenCause;
};

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

/** Utilities for identifying and casting `Error` instances as "contextualized" */
const Contextualized = {
  describes: Contextualized_describes,
  assume   : Contextualized_assume,
  cast     : Contextualized_cast,
};

export {
  Contextualized as default,
};
