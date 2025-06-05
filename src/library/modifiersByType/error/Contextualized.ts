import Attempt from '@/library/Attempt';

type Contextualized<
  SomeError extends Error,
  SomeCause extends Error,
> =
  & SomeError
  & {
    cause: SomeCause;
  };

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

/** Utilities for identifying and casting `Error` instances as "contextualized" */
const Contextualized = {
  describes: isContextualized,
  assume   : assertContextualized,
};

export {
  Contextualized as default,
};
