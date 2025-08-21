import type {
  Attempt_Error_Actionable,
} from '../Error';

import {
  type Attempt_Outcome_Failure,
  type Attempt_Outcome_Failure_Transformer,
  Attempt_Outcome_failureDueTo,
  Attempt_Outcome_causeIdentity,
} from './Failure';

import {
  type Attempt_Outcome_Success,
  type Attempt_Outcome_Success_Transformer,
  Attempt_Outcome_successThatYielded,
  Attempt_Outcome_productIdentity,
} from './Success';

import type {
  Attempt_Outcome_Transformer,
} from './Transformer';

type Attempt_Outcome<
  SomeProduct,
  SomeActionableError extends Attempt_Error_Actionable<string>,
> =
  | Attempt_Outcome_Success<SomeProduct>
  | Attempt_Outcome_Failure<SomeActionableError>
;

/**
 * Convenience method for:
 * 1. unwrapping the contents of _this_ outcome,
 * 2. transforming them, and
 * 3. wrapping the transformed contents in a _new_ outcome.
*
* Helps avoid boilerplate when transforming outcomes.
*/
function Attempt_Outcome_fromRewrapping<
  SomeTransformableActionableError extends Attempt_Error_Actionable<string>,
  SomeTransformedActionableError extends Attempt_Error_Actionable<string> = SomeTransformableActionableError,
>(
  givenOutcome: Attempt_Outcome_Failure<SomeTransformableActionableError>,
  given?: Attempt_Outcome_Failure_Transformer<
    SomeTransformableActionableError,
    SomeTransformedActionableError
  >,
): Attempt_Outcome_Failure<SomeTransformedActionableError>;
//
function Attempt_Outcome_fromRewrapping<
  SomeTransformableProduct,
  SomeTransformedProduct = SomeTransformableProduct,
>(
  givenOutcome: Attempt_Outcome_Success<SomeTransformableProduct>,
  given?: Attempt_Outcome_Success_Transformer<
    SomeTransformableProduct,
    SomeTransformedProduct
  >,
): Attempt_Outcome_Success<SomeTransformedProduct>;
//
function Attempt_Outcome_fromRewrapping<
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error_Actionable<string>,
  SomeTransformedProduct = SomeTransformableProduct,
  SomeTransformedActionableError extends Attempt_Error_Actionable<string> = SomeTransformableActionableError,
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
function Attempt_Outcome_fromRewrapping<
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error_Actionable<string>,
  SomeTransformedProduct = SomeTransformableProduct,
  SomeTransformedActionableError extends Attempt_Error_Actionable<string> = SomeTransformableActionableError,
>(
  givenOutcome: Attempt_Outcome<SomeTransformableProduct, SomeTransformableActionableError>,
  {
    product: toTransformedProduct = Attempt_Outcome_productIdentity<SomeTransformableProduct, SomeTransformedProduct>,
    cause: toTransformedCause = Attempt_Outcome_causeIdentity<SomeTransformableActionableError, SomeTransformedActionableError>,
  }: Attempt_Outcome_Transformer<
    SomeTransformableProduct,
    SomeTransformableActionableError,
    SomeTransformedProduct,
    SomeTransformedActionableError
  > = {
    product: Attempt_Outcome_productIdentity<SomeTransformableProduct, SomeTransformedProduct>,
    cause  : Attempt_Outcome_causeIdentity<SomeTransformableActionableError, SomeTransformedActionableError>,
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
  failureDueTo      : Attempt_Outcome_failureDueTo,
  successThatYielded: Attempt_Outcome_successThatYielded,
  fromRewrapping    : Attempt_Outcome_fromRewrapping,
};

type ProductOf<
  SomeOutcome extends Attempt_Outcome<unknown, Attempt_Error_Actionable<string>>,
> = SomeOutcome extends Attempt_Outcome_Success<infer NestedProduct>
  ? NestedProduct
  : never;

type CauseOf<
  SomeOutcome extends Attempt_Outcome<unknown, Attempt_Error_Actionable<string>>,
> = SomeOutcome extends Attempt_Outcome_Failure<infer NestedError>
  ? NestedError
  : never;

export {
  Attempt_Outcome,
  type Attempt_Outcome_Success,
  type Attempt_Outcome_Failure,
  type ProductOf,
  type CauseOf,
};
