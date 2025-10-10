import {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Outcome_Success_Product,
} from './Product';

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
   * Adds a guarded parallel to the `unwrapOrElse` and `unwrapOrThrow` methods:
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
   *   console.log(givenOutcome.unwrapOrElse('Errors ignored'));
   * }
   *
   * function doRiskyThingSafelyWhileHandlingErrors(
   *   givenOutcome: Attempt.Outcome<CustomProduct, CustomError>,
   *   recoverFrom: (expectedError: CustomError) => void,
   * ): void {
   *   if (
   *     givenOutcome.isFailure
   *   ) recoverFrom(givenOutcome.cause);
   *
   *   console.log(givenOutcome.value);
   * }
   * ```
   */
  readonly value: this['product'];

  rewrappedWith<
    SomeTransformedProduct = SomeProduct,
  >(
    given?: Attempt_Outcome_Success_Product.Transformer<
      SomeProduct,
      SomeTransformedProduct
    >
  ): Attempt_Outcome_Success<SomeTransformedProduct>;
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
