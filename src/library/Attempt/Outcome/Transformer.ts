import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Outcome_Failure,
} from './Failure';

import type {
  Attempt_Outcome_Success,
} from './Success';

interface Attempt_Outcome_Transformer<
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error.Actionable<string>,
  SomeTransformedProduct,
  SomeTransformedActionableError extends Attempt_Error.Actionable<string>,
> {
  product: Attempt_Outcome_Success.Product.Transformer<
    SomeTransformableProduct,
    SomeTransformedProduct
  >;
  cause: Attempt_Outcome_Failure.Cause.Transformer<
    SomeTransformableActionableError,
    SomeTransformedActionableError
  >;
}

export type {
  Attempt_Outcome_Transformer,
};
