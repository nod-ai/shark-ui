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
  Attempt_Outcome_mapBoth,
} from './mapBoth';

/**
 * Convenience method for:
 * 1. unwrapping the contents of _this_ outcome,
 * 2. transforming the error, and
 * 3. wrapping the transformed contents in a _new_ outcome.
 */
const Attempt_Outcome_mapErrorCause = <
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error.Actionable<string>,
  SomeTransformedProduct = SomeTransformableProduct,
  SomeTransformedActionableError extends Attempt_Error.Actionable<string> = SomeTransformableActionableError,
>(
  givenOutcome: Attempt_Outcome<
    SomeTransformableProduct,
    SomeTransformableActionableError
  >,
  givenCauseTransformer: Attempt_Outcome_Failure.Cause.Transformer<
    SomeTransformableActionableError,
    SomeTransformedActionableError
  >,
): Attempt_Outcome<
  SomeTransformedProduct,
  SomeTransformedActionableError
> => Attempt_Outcome_mapBoth(givenOutcome, {
  onSuccess: Attempt_Outcome_Success.Product.Transformer.identity<
    SomeTransformableProduct,
    SomeTransformedProduct
  >,
  onFailure: givenCauseTransformer,
});

export {
  Attempt_Outcome_mapErrorCause,
};
