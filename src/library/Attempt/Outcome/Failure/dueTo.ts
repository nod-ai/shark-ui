import type {
  Attempt_Error_Actionable,
} from '../../Error';

import {
  Attempt_Outcome_Failure_Cause_Transformer_identity,
} from './Cause';

import type {
  Attempt_Outcome_Failure_Transformer,
} from './Transformer';

import type {
  Attempt_Outcome_Failure,
} from './definition.ts';

const Attempt_Outcome_Failure_dueTo = <
  SomeActionableError extends Attempt_Error_Actionable<string>,
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
    SomeTransformedActionableError extends Attempt_Error_Actionable<string>,
  >(
    {
      cause: transformed,
    } = {
      cause: Attempt_Outcome_Failure_Cause_Transformer_identity<
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
  type Attempt_Outcome_Failure,
  type Attempt_Outcome_Failure_Transformer,
  Attempt_Outcome_Failure_dueTo,
  Attempt_Outcome_Failure_Cause_Transformer_identity,
};
