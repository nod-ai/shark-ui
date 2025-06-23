// cspell:words sugarfree discriminable

import type {
  ActionableError,
} from '../error';

import type {
  DiscriminableOutcome,
} from './Discriminable';

import {
  type Attempt_Success,
  successThatYielded,
} from './Success';

interface SemanticallySugarfreeFailure<
  SomeActionableError extends ActionableError<string>,
> extends DiscriminableOutcome<unknown> {
  readonly case: 'failure';
  readonly cause: SomeActionableError;
}

interface Attempt_Failure<
  SomeActionableError extends ActionableError<string>,
> extends SemanticallySugarfreeFailure<SomeActionableError> {
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
}

const failureDueTo = <
  SomeActionableError extends ActionableError<string>,
>(
  givenCause: SomeActionableError,
): Attempt_Failure<SomeActionableError> => ({
  case            : 'failure',
  cause           : givenCause,
  isSuccess       : false,
  isFailure       : true,
  optionallyUnwrap: () => null,
  forciblyUnwrap  : () => givenCause.throwAnyway('Unexpected forceful unwrap of a failure'),
  causeOfFailure  : givenCause,
});

const Attempt_Outcome = {
  failureDueTo,
  successThatYielded,
};

type Attempt_Outcome<
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
> =
  | Attempt_Success<SomeProduct>
  | Attempt_Failure<SomeActionableError>
;

type ProductOf<
  SomeOutcome extends Attempt_Outcome<unknown, ActionableError<string>>,
> = SomeOutcome extends Attempt_Success<infer NestedProduct>
  ? NestedProduct
  : never;

type CauseOf<
  SomeOutcome extends Attempt_Outcome<unknown, ActionableError<string>>,
> = SomeOutcome extends Attempt_Failure<infer NestedError>
  ? NestedError
  : never;

export {
  Attempt_Outcome,
  type Attempt_Success,
  type Attempt_Failure,
  type ProductOf,
  type CauseOf,
};
