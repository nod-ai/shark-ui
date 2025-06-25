// cspell:words sugarfree discriminable

import type {
  DiscriminableOutcome,
} from './Discriminable';

interface SemanticallySugarfreeSuccess<
  SomeProduct,
> extends DiscriminableOutcome<SomeProduct> {
  readonly case: 'success';
  readonly product: SomeProduct;
}

interface Attempt_Success<
  SomeProduct,
> extends SemanticallySugarfreeSuccess<SomeProduct> {
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
}

const successThatYielded = <
  SomeProduct,
>(
  givenProduct: SomeProduct,
): Attempt_Success<SomeProduct> => ({
  case            : 'success',
  product         : givenProduct,
  isSuccess       : true,
  isFailure       : false,
  optionallyUnwrap: () => givenProduct,
  forciblyUnwrap  : () => givenProduct,
  unwrapped       : givenProduct,
});

export {
  type Attempt_Success,
  successThatYielded,
};
