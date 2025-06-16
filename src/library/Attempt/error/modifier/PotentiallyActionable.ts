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
    givenError instanceof NonActionableError
  ) return givenError.throw();

  return givenError as PotentiallyActionable<SomeError>;
};

export {
  type PotentiallyActionable,
  assertPotentiallyActionable,
};
