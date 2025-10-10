import type {
  Attempt_Error,
} from '../Error';

import {
  Attempt_Exit_Failure,
} from './Failure';

import type {
  Attempt_Exit_Success,
} from './Success';

import type {
  Attempt_Exit,
} from './definition.declared.ts';

import {
  Attempt_Exit_mapBoth,
} from './mapBoth';

/**
 * Convenience method for:
 * 1. unwrapping the contents of _this_ outcome,
 * 2. transforming the product, and
 * 3. wrapping the transformed contents in a _new_ outcome.
 */
const Attempt_Exit_map = <
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error.Actionable<string>,
  SomeTransformedProduct = SomeTransformableProduct,
  SomeTransformedActionableError extends Attempt_Error.Actionable<string> = SomeTransformableActionableError,
>(
  givenOutcome: Attempt_Exit<
    SomeTransformableProduct,
    SomeTransformableActionableError
  >,
  givenProductTransformer: Attempt_Exit_Success.Product.Transformer<
    SomeTransformableProduct,
    SomeTransformedProduct
  >,
): Attempt_Exit<
  SomeTransformedProduct,
  SomeTransformedActionableError
> => Attempt_Exit_mapBoth(givenOutcome, {
  onSuccess: givenProductTransformer,
  onFailure: Attempt_Exit_Failure.Cause.Transformer.identity<
    SomeTransformableActionableError,
    SomeTransformedActionableError
  >,
});

export {
  Attempt_Exit_map,
};
