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
  // Propagated beyond confines of type system
  // i.e. with raw `throw` instead of `.throwAnyway()` method
  if (
    givenError instanceof ActionableError
  ) return givenError.throwAnyway();

  return givenError as SafelyPropagated<SomePotentiallyActionableError>;
};
