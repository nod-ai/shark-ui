import {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Outcome_Success_SemanticallySugarfree,
} from './SemanticallySugarfree';

import type {
  Attempt_Outcome_Success_Transformer,
} from './Transformer';

interface Attempt_Outcome_Success<
  SomeProduct,
>
  extends Attempt_Outcome_Success_SemanticallySugarfree<
    SomeProduct
  > {
  /**
   * Access the product nested within a successful outcome.
   *
   * Adds a guarded parallel to the `unwrapOr` and `unwrapOrThrow` methods:
   * ```ts
   * function doRiskyThingUnsafely(
   *   givenOutcome: Attempt.Outcome<CustomProduct, CustomError>,
   * ): void {
   *   console.log(givenOutcome.unwrapOrThrow());
   * }
   *
   * function doRiskyThingSafelyWhileIgnoringErrors(
   *   givenOutcome: Attempt.Outcome<CustomProduct, CustomError>,
   * ): void {
   *   console.log(givenOutcome.unwrapOr('Errors ignored'));
   * }
   *
   * function doRiskyThingSafelyWhileHandlingErrors(
   *   givenOutcome: Attempt.Outcome<CustomProduct, CustomError>,
   *   recoverFrom: (expectedError: CustomError) => void,
   * ): void {
   *   if (
   *     givenOutcome.isFailure
   *   ) recoverFrom(givenOutcome.causeOfFailure);
   *
   *   console.log(givenOutcome.unwrapped);
   * }
   * ```
   */
  readonly unwrapped: this['product'];

  rewrappedWith<
    SomeTransformedProduct = SomeProduct,
  >(
    given?: Attempt_Outcome_Success_Transformer<
      SomeProduct,
      SomeTransformedProduct
    >
  ): Attempt_Outcome_Success<SomeTransformedProduct>;
}

function Attempt_Outcome_Success(
  namespaceOnly: never = Attempt_Error.NonActionable.throw(
    `Unexpected call of module augmentation provision for "${Attempt_Outcome_Success.name}".`,
  ),
) {
  return namespaceOnly;
}

export {
  Attempt_Outcome_Success,
};
