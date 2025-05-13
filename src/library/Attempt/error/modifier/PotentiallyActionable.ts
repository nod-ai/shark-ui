import NonActionableError from '../NonActionableError';

export type PotentiallyActionable<
  SomeError extends Error,
> = Exclude<SomeError, NonActionableError>;

export const assertPotentiallyActionable = <
  SomeError extends Error,
>(
  givenError: SomeError,
): PotentiallyActionable<SomeError> => {
  if (
    givenError instanceof NonActionableError
  ) return givenError.throw();

  return givenError as PotentiallyActionable<SomeError>;
};
