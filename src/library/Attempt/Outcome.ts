import type {
  Is,
  If,
  Not,
} from '@/library/typeUtilities/Boolean';

import {
  type ActionableError,
} from './error';

// cspell:words sugarfree discriminable
interface SyntacticallySugarfreeDiscriminableOutcome {
  readonly case: 'success' | 'failure';
}

interface DiscriminableOutcome<
  SomeProduct,
> extends SyntacticallySugarfreeDiscriminableOutcome {
  readonly isSuccess: Is<this['case'], 'success'>;
  readonly isFailure: Not<this['isSuccess']>;

  optionallyUnwrap(): If<this['isSuccess'],
    SomeProduct,
    null
  >;

  forciblyUnwrap(): If<this['isSuccess'],
    SomeProduct,
    never
  >;
}

interface SemanticallySugarfreeSuccess<SomeProduct> extends DiscriminableOutcome<SomeProduct> {
  readonly case: 'success';
  readonly product: SomeProduct;
}

interface SemanticallySugarfreeFailure<
  SomeActionableError extends ActionableError<string>,
> extends DiscriminableOutcome<unknown> {
  readonly case: 'failure';
  readonly cause: SomeActionableError;
}

interface Success<SomeProduct> extends SemanticallySugarfreeSuccess<SomeProduct> {
  /**
   * Access the product nested within a successful outcome.
   *
   * Adds a final parallel to the `optionallyUnwrap` and `forciblyUnwrapped` methods:
   * ```ts
   * function doRiskyThingUnsafely(
   *   givenOutcome: Outcome<CustomProduct, CustomError>,
   * ): void {
   *   console.log(givenOutcome.forciblyUnwrap());
   * }
   *
   * function doRiskyThingSafelyWhileIgnoringErrors(
   *   givenOutcome: Outcome<CustomProduct, CustomError>,
   * ): void {
   *   console.log(givenOutcome.optionallyUnwrap());
   * }
   *
   * function doRiskyThingSafelyWhileHandlingErrors(
   *   givenOutcome: Outcome<CustomProduct, CustomError>,
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

interface Failure<
  SomeActionableError extends ActionableError<string>,
> extends SemanticallySugarfreeFailure<SomeActionableError> {
  /**
   * Semantic sugar for `cause`; useful for juxtaposition against guard statements:
   * ```ts
   * ...
   *
   * if (
   *   someOutcome.isSuccess
   * ) return;
   *
   * return NonActionableError.rethrow(someOutcome.causeOfFailure);
   * ```
   */
  readonly causeOfFailure: this['cause'];
}

const successThatYielded = <
  SomeProduct,
>(
  givenProduct: SomeProduct,
): Success<SomeProduct> => ({
  case            : 'success',
  product         : givenProduct,
  isSuccess       : true,
  isFailure       : false,
  optionallyUnwrap: () => givenProduct,
  forciblyUnwrap  : () => givenProduct,
  unwrapped       : givenProduct,
});

const failureDueTo = <
  SomeActionableError extends ActionableError<string>,
>(
  givenCause: SomeActionableError,
): Failure<SomeActionableError> => ({
  case            : 'failure',
  cause           : givenCause,
  isSuccess       : false,
  isFailure       : true,
  optionallyUnwrap: () => null,
  forciblyUnwrap  : () => givenCause.throwAnyway(),
  causeOfFailure  : givenCause,
});

const Outcome = {
  failureDueTo,
  successThatYielded,
};

type Outcome<
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
> =
  | Success<SomeProduct>
  | Failure<SomeActionableError>;

export {
  Outcome as default,
};

export type ProductOf<
  SomeOutcome extends Outcome<unknown, ActionableError<string>>,
> = SomeOutcome extends Success<infer NestedProduct>
  ? NestedProduct
  : never;

export type CauseOf<
  SomeOutcome extends Outcome<unknown, ActionableError<string>>,
> = SomeOutcome extends Failure<infer NestedError>
  ? NestedError
  : never;
