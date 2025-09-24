import type {
  Attempt_Error,
} from '../Error';

import {
  Attempt_Outcome_Failure,
} from './Failure';

import {
  Attempt_Outcome_Success,
} from './Success';

import type {
  Attempt_Outcome_Transformer,
} from './Transformer';

import type {
  Attempt_Outcome,
} from './definition.declared.ts';

/**
 * Convenience method for:
 * 1. unwrapping the contents of _this_ outcome,
 * 2. transforming them, and
 * 3. wrapping the transformed contents in a _new_ outcome.
*
* Helps avoid boilerplate when transforming outcomes.
*/
function Attempt_Outcome_fromRewrapping<
  SomeTransformableActionableError extends Attempt_Error.Actionable<string>,
  SomeTransformedActionableError extends Attempt_Error.Actionable<string> = SomeTransformableActionableError,
>(
  givenOutcome: Attempt_Outcome_Failure<SomeTransformableActionableError>,
  given?: Attempt_Outcome_Failure.Transformer<
    SomeTransformableActionableError,
    SomeTransformedActionableError
  >,
): Attempt_Outcome_Failure<SomeTransformedActionableError>;

function Attempt_Outcome_fromRewrapping<
  SomeTransformableProduct,
  SomeTransformedProduct = SomeTransformableProduct,
>(
  givenOutcome: Attempt_Outcome_Success<SomeTransformableProduct>,
  given?: Attempt_Outcome_Success.Transformer<
    SomeTransformableProduct,
    SomeTransformedProduct
  >,
): Attempt_Outcome_Success<SomeTransformedProduct>;

function Attempt_Outcome_fromRewrapping<
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error.Actionable<string>,
  SomeTransformedProduct = SomeTransformableProduct,
  SomeTransformedActionableError extends Attempt_Error.Actionable<string> = SomeTransformableActionableError,
>(
  givenOutcome: Attempt_Outcome<
    SomeTransformableProduct,
    SomeTransformableActionableError
  >,
  given?: Attempt_Outcome_Transformer<
    SomeTransformableProduct,
    SomeTransformableActionableError,
    SomeTransformedProduct,
    SomeTransformedActionableError
  >,
): Attempt_Outcome<
  SomeTransformedProduct,
  SomeTransformedActionableError
>;

function Attempt_Outcome_fromRewrapping<
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error.Actionable<string>,
  SomeTransformedProduct = SomeTransformableProduct,
  SomeTransformedActionableError extends Attempt_Error.Actionable<string> = SomeTransformableActionableError,
>(
  givenOutcome: Attempt_Outcome<
    SomeTransformableProduct,
    SomeTransformableActionableError
  >,
  {
    product: toTransformedProduct = Attempt_Outcome_Success.Product.Transformer.identity<
      SomeTransformableProduct,
      SomeTransformedProduct
    >,
    cause: toTransformedCause = Attempt_Outcome_Failure.Cause.Transformer.identity<
      SomeTransformableActionableError,
      SomeTransformedActionableError
    >,
  }: Attempt_Outcome_Transformer<
    SomeTransformableProduct,
    SomeTransformableActionableError,
    SomeTransformedProduct,
    SomeTransformedActionableError
  > = {
    product: Attempt_Outcome_Success.Product.Transformer.identity<
      SomeTransformableProduct,
      SomeTransformedProduct
    >,
    cause: Attempt_Outcome_Failure.Cause.Transformer.identity<
      SomeTransformableActionableError,
      SomeTransformedActionableError
    >,
  },
): Attempt_Outcome<
  SomeTransformedProduct,
  SomeTransformedActionableError
> {
  return givenOutcome.isSuccess
    ? givenOutcome.rewrappedWith({
        product: toTransformedProduct,
      })
    : givenOutcome.rewrappedWith({
        cause: toTransformedCause,
      });
}

export {
  Attempt_Outcome_fromRewrapping,
};
