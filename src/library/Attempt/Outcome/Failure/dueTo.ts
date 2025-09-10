import type * as Attempt_Error from '../../Error';

import * as Attempt_Outcome_Failure_Cause from './Cause';

import type {
  Attempt_Outcome_Failure,
} from './definition.ts';

const Attempt_Outcome_Failure_dueTo = <
  SomeActionableError extends Attempt_Error.Actionable<string>,
>(
  givenCause: SomeActionableError,
): Attempt_Outcome_Failure<SomeActionableError> => ({
  discriminant    : 'failure',
  cause           : givenCause,
  isSuccess       : false,
  isFailure       : true,
  optionallyUnwrap: () => null,
  forciblyUnwrap  : () => givenCause.throwAnyway('Unexpected forceful unwrap of a failure'),
  causeOfFailure  : givenCause,
  rewrappedWith   : <
    SomeTransformedActionableError extends Attempt_Error.Actionable<string>,
  >(
    {
      cause: transformed,
    } = {
      cause: Attempt_Outcome_Failure_Cause.Transformer_identity<
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
