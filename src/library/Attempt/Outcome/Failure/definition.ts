import type * as Attempt_Error from '../../Error';

import type {
  Attempt_Outcome_Failure_SemanticallySugarfree,
} from './SemanticallySugarfree';

import type {
  Attempt_Outcome_Failure_Transformer,
} from './Transformer';

interface Attempt_Outcome_Failure<
  SomeActionableError extends Attempt_Error.Actionable<string>,
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
    SomeTransformedActionableError extends Attempt_Error.Actionable<string> = SomeActionableError,
  >(
    given?: Attempt_Outcome_Failure_Transformer<
      SomeActionableError,
      SomeTransformedActionableError
    >
  ): Attempt_Outcome_Failure<SomeTransformedActionableError>;
}

export type {
  Attempt_Outcome_Failure,
};
