import NonActionableError from '../NonActionableError';

type PotentiallyActionable<
  SomeError extends Error,
> = Exclude<SomeError, NonActionableError>;

const assertPotentiallyActionable = <
  SomeError extends Error,
>(
  givenError: SomeError,
): PotentiallyActionable<SomeError> => {
  if (
    !(givenError instanceof NonActionableError)
  ) return givenError as PotentiallyActionable<SomeError>;

  return givenError.throw();
};

export {
  type PotentiallyActionable,
  assertPotentiallyActionable,
};
