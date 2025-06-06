import HonoraryNonActionableError from '../HonoraryNonActionableError';
import NonActionableError from '../NonActionableError';

type PotentiallyActionable<
  SomeError extends Error,
> = Exclude<SomeError, NonActionableError | HonoraryNonActionableError>;

const assertPotentiallyActionable = <
  SomeError extends Error,
>(
  givenError: SomeError,
): PotentiallyActionable<SomeError> => {
  if (
    givenError instanceof NonActionableError
  ) return givenError.throw();

  if (
    HonoraryNonActionableError.describes(givenError)
  ) throw givenError; // eslint-disable-line no-restricted-syntax

  return givenError as PotentiallyActionable<SomeError>;
};

export {
  type PotentiallyActionable,
  assertPotentiallyActionable,
};
