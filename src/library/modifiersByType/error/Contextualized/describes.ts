import type {
  Instantiable,
} from '@/library/typeUtilities';

import type {
  _default as Contextualized,
} from './definition.ts';

const Contextualized_describes = <
  SomeError extends Error,
  SomeCause extends Error,
>(
  givenError: SomeError,
  GivenCause: Instantiable<SomeCause> | ErrorConstructor = Error,
): givenError is Contextualized<SomeError, SomeCause> => {
  return givenError.cause instanceof GivenCause;
};

export {
  Contextualized_describes,
};
