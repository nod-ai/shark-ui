// cspell:words sugarfree discriminable

import type {
  DiscriminableOutcome,
} from '../Discriminable';

import {
  type Attempt_Success_Transformer,
  productIdentity,
} from './Transformer';

interface SemanticallySugarfreeSuccess<
  SomeProduct,
> extends DiscriminableOutcome<
  'success',
  SomeProduct
> {
  readonly product: SomeProduct;
}

interface Attempt_Success<
  SomeProduct,
> extends SemanticallySugarfreeSuccess<
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
    given?: Attempt_Success_Transformer<
      SomeProduct,
      TransformedProduct
    >
  ): Attempt_Success<TransformedProduct>;
}

const successThatYielded = <
  SomeProduct,
>(
  givenProduct: SomeProduct,
): Attempt_Success<SomeProduct> => ({
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
      product: productIdentity<SomeProduct, TransformedProduct>,
    },
  ) => {
    const transformedProduct = transformed(givenProduct);
    const transformedSuccess = successThatYielded(transformedProduct);
    return transformedSuccess;
  },
});

export {
  type Attempt_Success,
  type Attempt_Success_Transformer,
  successThatYielded,
  productIdentity,
};
