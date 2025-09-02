import type {
  Attempt_Error_Actionable,
} from '../../Error';

import type {
  Attempt_Outcome_Discriminable,
} from '../Discriminable/definition';

import {
  type Attempt_Outcome_Failure_Transformer,
  Attempt_Outcome_Failure_Cause_Transformer_identity,
} from './Transformer';

interface Attempt_Outcome_Failure_SemanticallySugarfree<
  SomeActionableError extends Attempt_Error_Actionable<string>,
> extends Attempt_Outcome_Discriminable<
    'failure',
    SomeActionableError
  > {
  readonly cause: SomeActionableError;
}

interface Attempt_Outcome_Failure<
  SomeActionableError extends Attempt_Error_Actionable<string>,
> extends Attempt_Outcome_Failure_SemanticallySugarfree<
    SomeActionableError
  > {
  /**
   * Semantic sugar for `cause`; useful for juxtaposition against early exits:
   * ```ts
   * function safelyGetProductWhileHandlingErrors(
   *   givenOutcome: Attempt.Outcome<CustomProduct, CustomError>,
   *   recoverFrom: (expectedError: CustomError) => void,
   * ): CustomProduct {
   *   if (
   *     givenOutcome.isSuccess
   *   ) return givenOutcome.unwrapped;
   *
   *   ...
   *
   *   recoverFrom(givenOutcome.causeOfFailure);
   * }
   * ```
   */
  readonly causeOfFailure: this['cause'];

  rewrappedWith<
    SomeTransformedActionableError extends Attempt_Error_Actionable<string> = SomeActionableError,
  >(
    given?: Attempt_Outcome_Failure_Transformer<
      SomeActionableError,
      SomeTransformedActionableError
    >
  ): Attempt_Outcome_Failure<SomeTransformedActionableError>;
}

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
