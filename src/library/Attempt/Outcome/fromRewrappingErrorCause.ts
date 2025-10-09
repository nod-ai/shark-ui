import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Outcome_Failure,
} from './Failure';

import {
  Attempt_Outcome_Success,
} from './Success';

import type {
  Attempt_Outcome,
} from './definition.declared.ts';

import {
  Attempt_Outcome_fromRewrappingBoth,
} from './fromRewrappingBoth';

/**
 * Convenience method for:
 * 1. unwrapping the contents of _this_ outcome,
 * 2. transforming the error, and
 * 3. wrapping the transformed contents in a _new_ outcome.
 */
const Attempt_Outcome_fromRewrappingErrorCause = <
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
    cause: toTransformedCause,
  }: Attempt_Outcome_Failure.Transformer<
    SomeTransformableActionableError,
    SomeTransformedActionableError
  >,
): Attempt_Outcome<
  SomeTransformedProduct,
  SomeTransformedActionableError
> => Attempt_Outcome_fromRewrappingBoth(givenOutcome, {
  product: Attempt_Outcome_Success.Product.Transformer.identity<
    SomeTransformableProduct,
    SomeTransformedProduct
  >,
  cause: toTransformedCause,
});

export {
  Attempt_Outcome_fromRewrappingErrorCause,
};
