import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit_Failure,
} from './Failure';

import {
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
 * 2. transforming the error, and
 * 3. wrapping the transformed contents in a _new_ outcome.
 */
const Attempt_Exit_mapErrorCause = <
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error.Actionable<string>,
  SomeTransformedProduct = SomeTransformableProduct,
  SomeTransformedActionableError extends Attempt_Error.Actionable<string> = SomeTransformableActionableError,
>(
  givenExit: Attempt_Exit<
    SomeTransformableProduct,
    SomeTransformableActionableError
  >,
  givenCauseTransformer: Attempt_Exit_Failure.Cause.Transformer<
    SomeTransformableActionableError,
    SomeTransformedActionableError
  >,
): Attempt_Exit<
  SomeTransformedProduct,
  SomeTransformedActionableError
> => Attempt_Exit_mapBoth(givenExit, {
  onSuccess: Attempt_Exit_Success.Product.Transformer.identity<
    SomeTransformableProduct,
    SomeTransformedProduct
  >,
  onFailure: givenCauseTransformer,
});

export {
  Attempt_Exit_mapErrorCause,
};
