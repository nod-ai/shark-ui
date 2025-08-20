// cspell:words sugarfree discriminable

import type {
  Attempt_DiscriminableOutcome,
} from '../Discriminable';

import {
  type Attempt_Success_Transformer,
  Attempt_productIdentity,
} from './Transformer';

interface Attempt_SemanticallySugarfreeSuccess<
  SomeProduct,
> extends Attempt_DiscriminableOutcome<
  'success',
  SomeProduct
> {
  readonly product: SomeProduct;
}

interface Attempt_Success<
  SomeProduct,
> extends Attempt_SemanticallySugarfreeSuccess<
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

const Attempt_successThatYielded = <
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
      product: Attempt_productIdentity<SomeProduct, TransformedProduct>,
    },
  ) => {
    const transformedProduct = transformed(givenProduct);
    const transformedSuccess = Attempt_successThatYielded(transformedProduct);
    return transformedSuccess;
  },
});

export {
  type Attempt_Success,
  type Attempt_Success_Transformer,
  Attempt_successThatYielded,
  Attempt_productIdentity,
};
