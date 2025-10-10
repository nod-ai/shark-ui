import {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Outcome_Failure_Cause,
} from './Cause';

import type {
  Attempt_Outcome_Failure_SemanticallySugarfree,
} from './SemanticallySugarfree';

interface Attempt_Outcome_Failure<
  SomeActionableError extends Attempt_Error.Actionable<string>,
>
  extends Attempt_Outcome_Failure_SemanticallySugarfree<
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
   *   ) return givenOutcome.value;
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
    given?: Attempt_Outcome_Failure_Cause.Transformer<
      SomeActionableError,
      SomeTransformedActionableError
    >
  ): Attempt_Outcome_Failure<SomeTransformedActionableError>;
}

function Attempt_Outcome_Failure(
  namespaceOnly: never = Attempt_Error.NonActionable.throw(
    `Unexpected call of module augmentation provision for "${Attempt_Outcome_Failure.name}".`,
  ),
): never {
  return namespaceOnly;
}

export {
  Attempt_Outcome_Failure,
};
