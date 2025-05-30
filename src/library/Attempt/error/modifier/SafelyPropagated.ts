import ActionableError from '../ActionableError';

import type {
  PotentiallyActionable,
} from './PotentiallyActionable';

type SafelyPropagated<
  SomePotentiallyActionableError extends PotentiallyActionable<Error>,
> = Exclude<
  SomePotentiallyActionableError,
  ActionableError<string>
>;

export const assertSafelyPropagated = <
  SomePotentiallyActionableError extends PotentiallyActionable<Error>,
>(
  givenError: SomePotentiallyActionableError,
): SafelyPropagated<SomePotentiallyActionableError> => {
  if (
    givenError instanceof ActionableError
  ) return givenError.throwAnyway('Unexpected raw `throw` of some `ActionableError`. If this was intentional, use `.throwAnyway(...)` on the instance instead.');

  return givenError as SafelyPropagated<SomePotentiallyActionableError>;
};
