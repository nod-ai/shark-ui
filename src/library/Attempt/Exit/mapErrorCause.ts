import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit_Exit,
} from './Exit';

import type {
  Attempt_Exit_Failure,
} from './Failure';

import {
  Attempt_Exit_Success,
} from './Success';

import {
  Attempt_Exit_mapBoth,
} from './mapBoth';

/**
 * Convenience method for:
 * 1. unwrapping the contents of _this_ exit,
 * 2. transforming the error, and
 * 3. wrapping the transformed contents in a _new_ exit.
 */
const Attempt_Exit_mapErrorCause = <
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error.Actionable,
  SomeTransformedProduct = SomeTransformableProduct,
  SomeTransformedActionableError extends Attempt_Error.Actionable = SomeTransformableActionableError,
>(
  givenExit: Attempt_Exit_Exit<
    SomeTransformableProduct,
    SomeTransformableActionableError
  >,
  givenCauseTransformer: Attempt_Exit_Failure.Cause.Transformer<
    SomeTransformableActionableError,
    SomeTransformedActionableError
  >,
): Attempt_Exit_Exit<
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
