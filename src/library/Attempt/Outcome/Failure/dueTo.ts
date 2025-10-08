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
  discriminant  : 'failure',
  cause         : givenCause,
  isSuccess     : false,
  isFailure     : true,
  unwrapOrNull  : () => null,
  unwrapOrThrow : () => givenCause.throwAnyway('Unexpected forceful unwrap of a failure'),
  causeOfFailure: givenCause,
  rewrappedWith : <
    SomeTransformedActionableError extends Attempt_Error.Actionable<string>,
  >(
    {
      cause: transformed,
    } = {
      cause: Attempt_Outcome_Failure_Cause.Transformer.identity<
        SomeActionableError,
        SomeTransformedActionableError
      >,
    },
  ) => {
    const transformedCause = transformed(givenCause);
    const transformedFailure = Attempt_Outcome_Failure_dueTo(transformedCause);
    return transformedFailure;
  },
});

export {
  Attempt_Outcome_Failure_dueTo,
};
