import type {
  Attempt_Error,
} from '../../Error';

import {
  Attempt_Outcome_Failure_Cause,
} from './Cause';

import type {
  Attempt_Outcome_Failure,
} from './definition.declared.ts';

const Attempt_Outcome_Failure_dueTo = <
  SomeActionableError extends Attempt_Error.Actionable<string>,
>(
  givenCause: SomeActionableError,
): Attempt_Outcome_Failure<SomeActionableError> => ({
  discriminant : 'failure',
  cause        : givenCause,
  isSuccess    : false,
  isFailure    : true,
  unwrapOr     : <SomeFallback>($0: SomeFallback) => $0,
  unwrapOrThrow: () => givenCause.throwAnyway('Unexpected forceful unwrap of a failure'),
  rewrappedWith: <
    SomeTransformedActionableError extends Attempt_Error.Actionable<string>,
  >(
    transformed = Attempt_Outcome_Failure_Cause.Transformer.identity<
      SomeActionableError,
      SomeTransformedActionableError
    >,
  ) => {
    const transformedCause = transformed(givenCause);
    const transformedFailure = Attempt_Outcome_Failure_dueTo(transformedCause);
    return transformedFailure;
  },
});

export {
  Attempt_Outcome_Failure_dueTo,
};
