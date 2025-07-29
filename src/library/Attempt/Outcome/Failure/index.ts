// cspell:words sugarfree discriminable

import type {
  ActionableError,
} from '../../error/exports';

import type {
  DiscriminableOutcome,
} from '../Discriminable';

import {
  type Attempt_Failure_Transformer,
  causeIdentity,
} from './Transformer';

interface SemanticallySugarfreeFailure<
  SomeActionableError extends ActionableError<string>,
> extends DiscriminableOutcome<
  'failure',
  SomeActionableError
> {
  readonly cause: SomeActionableError;
}

interface Attempt_Failure<
  SomeActionableError extends ActionableError<string>,
> extends SemanticallySugarfreeFailure<
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
    TransformedActionableError extends ActionableError<string> = SomeActionableError,
  >(
    given?: Attempt_Failure_Transformer<
      SomeActionableError,
      TransformedActionableError
    >
  ): Attempt_Failure<TransformedActionableError>;
}

const failureDueTo = <
  SomeActionableError extends ActionableError<string>,
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
    TransformedActionableError extends ActionableError<string>,
  >(
    {
      cause: transformed,
    } = {
      cause: causeIdentity<SomeActionableError, TransformedActionableError>,
    },
  ) => {
    const transformedCause = transformed(givenCause);
    const transformedFailure = failureDueTo(transformedCause);
    return transformedFailure;
  },
});

export {
  type Attempt_Failure,
  type Attempt_Failure_Transformer,
  failureDueTo,
  causeIdentity,
};
