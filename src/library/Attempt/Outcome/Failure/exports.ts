// cspell:words sugarfree discriminable

import type {
  Attempt_ActionableError,
} from '../../error';

import type {
  Attempt_DiscriminableOutcome,
} from '../Discriminable';

import {
  type Attempt_Failure_Transformer,
  Attempt_causeIdentity,
} from './Transformer';

interface Attempt_SemanticallySugarfreeFailure<
  SomeActionableError extends Attempt_ActionableError<string>,
> extends Attempt_DiscriminableOutcome<
  'failure',
  SomeActionableError
> {
  readonly cause: SomeActionableError;
}

interface Attempt_Failure<
  SomeActionableError extends Attempt_ActionableError<string>,
> extends Attempt_SemanticallySugarfreeFailure<
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
    TransformedActionableError extends Attempt_ActionableError<string> = SomeActionableError,
  >(
    given?: Attempt_Failure_Transformer<
      SomeActionableError,
      TransformedActionableError
    >
  ): Attempt_Failure<TransformedActionableError>;
}

const Attempt_failureDueTo = <
  SomeActionableError extends Attempt_ActionableError<string>,
>(
  givenCause: SomeActionableError,
): Attempt_Failure<SomeActionableError> => ({
  discriminant    : 'failure',
  cause           : givenCause,
  isSuccess       : false,
  isFailure       : true,
  optionallyUnwrap: () => null,
  forciblyUnwrap  : () => givenCause.throwAnyway('Unexpected forceful unwrap of a failure'),
  causeOfFailure  : givenCause,
  rewrappedWith   : <
    TransformedActionableError extends Attempt_ActionableError<string>,
  >(
    {
      cause: transformed,
    } = {
      cause: Attempt_causeIdentity<SomeActionableError, TransformedActionableError>,
    },
  ) => {
    const transformedCause = transformed(givenCause);
    const transformedFailure = Attempt_failureDueTo(transformedCause);
    return transformedFailure;
  },
});

export {
  type Attempt_Failure,
  type Attempt_Failure_Transformer,
  Attempt_failureDueTo,
  Attempt_causeIdentity,
};
