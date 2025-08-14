import type {
  Attempt_Outcome_Success_SemanticallySugarfree,
} from './SemanticallySugarfree';

import {
  type Attempt_Outcome_Success_Transformer,
  Attempt_Outcome_Success_Product_Transformer_identity,
} from './Transformer';

interface Attempt_Outcome_Success<
  SomeProduct,
> extends Attempt_Outcome_Success_SemanticallySugarfree<
    SomeProduct
  > {
  /**
   * Access the product nested within a successful outcome.
   *
   * Adds a guarded parallel to the `optionallyUnwrap` and `forciblyUnwrapped` methods:
   * ```ts
   * function doRiskyThingUnsafely(
   *   givenOutcome: Attempt.Outcome<CustomProduct, CustomError>,
   * ): void {
   *   console.log(givenOutcome.forciblyUnwrap());
   * }
   *
   * function doRiskyThingSafelyWhileIgnoringErrors(
   *   givenOutcome: Attempt.Outcome<CustomProduct, CustomError>,
   * ): void {
   *   console.log(givenOutcome.optionallyUnwrap());
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

const Attempt_Outcome_Success_thatYielded = <
  SomeProduct,
>(
  givenProduct: SomeProduct,
): Attempt_Outcome_Success<SomeProduct> => ({
  discriminant    : 'success',
  product         : givenProduct,
  isSuccess       : true,
  isFailure       : false,
  optionallyUnwrap: () => givenProduct,
  forciblyUnwrap  : () => givenProduct,
  unwrapped       : givenProduct,
  rewrappedWith   : <
    SomeTransformedProduct,
  >(
    {
      product: transformed,
    } = {
      product: Attempt_Outcome_Success_Product_Transformer_identity<
        SomeProduct,
        SomeTransformedProduct
      >,
    },
  ) => {
    const transformedProduct = transformed(givenProduct);
    const transformedSuccess = Attempt_Outcome_Success_thatYielded(transformedProduct);
    return transformedSuccess;
  },
});

export {
  type Attempt_Outcome_Success,
  type Attempt_Outcome_Success_Transformer,
  Attempt_Outcome_Success_thatYielded,
  Attempt_Outcome_Success_Product_Transformer_identity,
};
