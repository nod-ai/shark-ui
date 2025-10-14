import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit_Failure,
} from './Failure';

import type {
  Attempt_Exit_Success,
} from './Success';

interface Attempt_Exit_Transformer<
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error.Actionable,
  SomeTransformedProduct,
  SomeTransformedActionableError extends Attempt_Error.Actionable,
> {
  onSuccess: Attempt_Exit_Success.Product.Transformer<
    SomeTransformableProduct,
    SomeTransformedProduct
  >;
  onFailure: Attempt_Exit_Failure.Cause.Transformer<
    SomeTransformableActionableError,
    SomeTransformedActionableError
  >;
}

export type {
  Attempt_Exit_Transformer,
};
