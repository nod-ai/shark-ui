import HonoraryNonActionableError from '../HonoraryNonActionableError';
import NonActionableError from '../NonActionableError';

export type PotentiallyActionable<
  SomeError extends Error,
> = Exclude<SomeError, NonActionableError | HonoraryNonActionableError>;

export const assertPotentiallyActionable = <
  SomeError extends Error,
>(
  givenError: SomeError,
): PotentiallyActionable<SomeError> => {
  if (
    givenError instanceof NonActionableError
  ) return givenError.throw();

  if (
    givenError instanceof HonoraryNonActionableError
  ) return NonActionableError.rethrow(givenError);

  return givenError as PotentiallyActionable<SomeError>;
};
