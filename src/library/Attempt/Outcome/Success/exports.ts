// cspell:words sugarfree discriminable

import type {
  Attempt_Outcome_Discriminable,
} from '../Discriminable';

import {
  type Attempt_Outcome_Success_Transformer,
  Attempt_Outcome_Success_productIdentity,
} from './Transformer';

interface Attempt_Outcome_Success_SemanticallySugarfree<
  SomeProduct,
> extends Attempt_Outcome_Discriminable<
  'success',
  SomeProduct
> {
  readonly product: SomeProduct;
}

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
    TransformedProduct = SomeProduct,
  >(
    given?: Attempt_Outcome_Success_Transformer<
      SomeProduct,
      TransformedProduct
    >
  ): Attempt_Outcome_Success<TransformedProduct>;
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
    TransformedProduct,
  >(
    {
      product: transformed,
    } = {
      product: Attempt_Outcome_Success_productIdentity<SomeProduct, TransformedProduct>,
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
  Attempt_Outcome_Success_productIdentity,
};
