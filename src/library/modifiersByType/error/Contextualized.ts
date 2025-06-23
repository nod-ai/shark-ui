import Attempt from '@/library/Attempt';

type Contextualized<
  SomeError extends Error,
  SomeCause extends Error,
> =
  & SomeError
  & {
    cause: SomeCause;
  }
;

interface Instantiable<Any> {
  [Symbol.hasInstance]: (value: unknown) => value is Any;
}

const isContextualized = <
  SomeError extends Error,
  SomeCause extends Error,
>(
  givenError: SomeError,
  GivenCause: Instantiable<SomeCause> | ErrorConstructor = Error,
): givenError is Contextualized<SomeError, SomeCause> => {
  return givenError.cause instanceof GivenCause;
};

const assertContextualized = <
  SomeError extends Error,
  SomeCause extends Error,
>(
  givenError: SomeError,
  GivenCause: Instantiable<SomeCause> | ErrorConstructor = Error,
): Contextualized<SomeError, SomeCause> => {
  if (
    isContextualized<SomeError, SomeCause>(givenError, GivenCause)
  ) return givenError;

  return Attempt.abandon('Expected error to have a cause');
};

const asContextualized = <
  SomeError extends Error,
  SomeCause extends Error,
>(
  givenError: SomeError,
  givenFallbackMessage: string,
  GivenCause: Instantiable<SomeCause> | ErrorConstructor = Error,
): Contextualized<SomeError, SomeCause> | Contextualized<Error, SomeError> => {
  if (
    isContextualized<SomeError, SomeCause>(givenError, GivenCause)
  ) return givenError;

  const contextualizedError = new Error(givenFallbackMessage, {
    cause: givenError,
  });

  return assertContextualized<Error, SomeError>(contextualizedError, Error);
};

/** Utilities for identifying and casting `Error` instances as "contextualized" */
const Contextualized = {
  describes: isContextualized,
  assume   : assertContextualized,
  cast     : asContextualized,
};

export {
  Contextualized as default,
};
