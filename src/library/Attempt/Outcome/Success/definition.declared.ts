import {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Outcome_Success_SemanticallySugarfree,
} from './SemanticallySugarfree';

interface Attempt_Outcome_Success<
  SomeProduct,
>
  extends Attempt_Outcome_Success_SemanticallySugarfree<
    SomeProduct
  > {
  /**
   * Access the product nested within a successful outcome.
   *
   * Adds a guarded parallel to the `getOrElse` and `getOrThrow` methods:
   * ```ts
   * function doRiskyThingUnsafely(
   *   givenOutcome: Attempt.Outcome<CustomProduct, CustomError>,
   * ): void {
   *   console.log(Attempt.Either.getOrThrow(givenOutcome));
   * }
   *
   * function doRiskyThingSafelyWhileIgnoringErrors(
   *   givenOutcome: Attempt.Outcome<CustomProduct, CustomError>,
   * ): void {
   *   console.log(Attempt.Either.getOrElse(givenOutcome, () => 'Errors ignored'));
   * }
   *
   * function doRiskyThingSafelyWhileHandlingErrors(
   *   givenOutcome: Attempt.Outcome<CustomProduct, CustomError>,
   *   recoverFrom: (expectedError: CustomError) => void,
   * ): void {
   *   if (
   *     Attempt.Outcome.isFailure(givenOutcome)
   *   ) recoverFrom(givenOutcome.cause);
   *
   *   console.log(givenOutcome.value);
   * }
   * ```
   */
  readonly value: this['product'];
}

function Attempt_Outcome_Success(
  namespaceOnly: never = Attempt_Error.NonActionable.throw(
    `Unexpected call of module augmentation provision for "${Attempt_Outcome_Success.name}".`,
  ),
): never {
  return namespaceOnly;
}

export {
  Attempt_Outcome_Success,
};
