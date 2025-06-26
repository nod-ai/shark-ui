import type {
  ActionableError,
} from '../error';

import {
  type Attempt_Failure,
  type Attempt_Failure_Transformer,
  failureDueTo,
  causeIdentity,
} from './Failure';

import {
  type Attempt_Success,
  type Attempt_Success_Transformer,
  successThatYielded,
  productIdentity,
} from './Success';

import type {
  Attempt_Outcome_Transformer,
} from './Transformer';

type Attempt_Outcome<
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
> =
  | Attempt_Success<SomeProduct>
  | Attempt_Failure<SomeActionableError>
;

/**
 * Convenience method for:
 * 1. unwrapping the contents of _this_ outcome,
 * 2. transforming them, and
 * 3. wrapping the transformed contents in a _new_ outcome.
*
* Helps avoid boilerplate when transforming outcomes.
*/
function fromRewrapping<
  TransformableActionableError extends ActionableError<string>,
  TransformedActionableError extends ActionableError<string> = TransformableActionableError,
>(
  givenOutcome: Attempt_Failure<TransformableActionableError>,
  given?: Attempt_Failure_Transformer<
    TransformableActionableError,
    TransformedActionableError
  >,
): Attempt_Failure<TransformedActionableError>;
//
function fromRewrapping<
  TransformableProduct,
  TransformedProduct = TransformableProduct,
>(
  givenOutcome: Attempt_Success<TransformableProduct>,
  given?: Attempt_Success_Transformer<
    TransformableProduct,
    TransformedProduct
  >,
): Attempt_Success<TransformedProduct>;
//
function fromRewrapping<
  TransformableProduct,
  TransformableActionableError extends ActionableError<string>,
  TransformedProduct = TransformableProduct,
  TransformedActionableError extends ActionableError<string> = TransformableActionableError,
>(
  givenOutcome: Attempt_Outcome<TransformableProduct, TransformableActionableError>,
  given?: Attempt_Outcome_Transformer<
    TransformableProduct,
    TransformableActionableError,
    TransformedProduct,
    TransformedActionableError
  >,
): Attempt_Outcome<TransformedProduct, TransformedActionableError>;
//
function fromRewrapping<
  TransformableProduct,
  TransformableActionableError extends ActionableError<string>,
  TransformedProduct = TransformableProduct,
  TransformedActionableError extends ActionableError<string> = TransformableActionableError,
>(
  givenOutcome: Attempt_Outcome<TransformableProduct, TransformableActionableError>,
  {
    product: toTransformedProduct = productIdentity<TransformableProduct, TransformedProduct>,
    cause: toTransformedCause = causeIdentity<TransformableActionableError, TransformedActionableError>,
  }: Attempt_Outcome_Transformer<
    TransformableProduct,
    TransformableActionableError,
    TransformedProduct,
    TransformedActionableError
  > = {
    product: productIdentity<TransformableProduct, TransformedProduct>,
    cause  : causeIdentity<TransformableActionableError, TransformedActionableError>,
  },
): Attempt_Outcome<TransformedProduct, TransformedActionableError> {
  return givenOutcome.isSuccess
    ? givenOutcome.rewrappedWith({
        product: toTransformedProduct,
      })
    : givenOutcome.rewrappedWith({
        cause: toTransformedCause,
      });
}

const Attempt_Outcome = {
  failureDueTo,
  successThatYielded,
  fromRewrapping,
};

type ProductOf<
  SomeOutcome extends Attempt_Outcome<unknown, ActionableError<string>>,
> = SomeOutcome extends Attempt_Success<infer NestedProduct>
  ? NestedProduct
  : never;

type CauseOf<
  SomeOutcome extends Attempt_Outcome<unknown, ActionableError<string>>,
> = SomeOutcome extends Attempt_Failure<infer NestedError>
  ? NestedError
  : never;

export {
  Attempt_Outcome,
  type Attempt_Success,
  type Attempt_Failure,
  type ProductOf,
  type CauseOf,
};
