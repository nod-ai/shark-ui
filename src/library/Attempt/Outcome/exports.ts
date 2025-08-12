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
  SomeTransformableActionableError extends ActionableError<string>,
  SomeTransformedActionableError extends ActionableError<string> = SomeTransformableActionableError,
>(
  givenOutcome: Attempt_Failure<SomeTransformableActionableError>,
  given?: Attempt_Failure_Transformer<
    SomeTransformableActionableError,
    SomeTransformedActionableError
  >,
): Attempt_Failure<SomeTransformedActionableError>;
//
function fromRewrapping<
  SomeTransformableProduct,
  SomeTransformedProduct = SomeTransformableProduct,
>(
  givenOutcome: Attempt_Success<SomeTransformableProduct>,
  given?: Attempt_Success_Transformer<
    SomeTransformableProduct,
    SomeTransformedProduct
  >,
): Attempt_Success<SomeTransformedProduct>;
//
function fromRewrapping<
  SomeTransformableProduct,
  SomeTransformableActionableError extends ActionableError<string>,
  SomeTransformedProduct = SomeTransformableProduct,
  SomeTransformedActionableError extends ActionableError<string> = SomeTransformableActionableError,
>(
  givenOutcome: Attempt_Outcome<SomeTransformableProduct, SomeTransformableActionableError>,
  given?: Attempt_Outcome_Transformer<
    SomeTransformableProduct,
    SomeTransformableActionableError,
    SomeTransformedProduct,
    SomeTransformedActionableError
  >,
): Attempt_Outcome<SomeTransformedProduct, SomeTransformedActionableError>;
//
function fromRewrapping<
  SomeTransformableProduct,
  SomeTransformableActionableError extends ActionableError<string>,
  SomeTransformedProduct = SomeTransformableProduct,
  SomeTransformedActionableError extends ActionableError<string> = SomeTransformableActionableError,
>(
  givenOutcome: Attempt_Outcome<SomeTransformableProduct, SomeTransformableActionableError>,
  {
    product: toTransformedProduct = productIdentity<SomeTransformableProduct, SomeTransformedProduct>,
    cause: toTransformedCause = causeIdentity<SomeTransformableActionableError, SomeTransformedActionableError>,
  }: Attempt_Outcome_Transformer<
    SomeTransformableProduct,
    SomeTransformableActionableError,
    SomeTransformedProduct,
    SomeTransformedActionableError
  > = {
    product: productIdentity<SomeTransformableProduct, SomeTransformedProduct>,
    cause  : causeIdentity<SomeTransformableActionableError, SomeTransformedActionableError>,
  },
): Attempt_Outcome<SomeTransformedProduct, SomeTransformedActionableError> {
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
