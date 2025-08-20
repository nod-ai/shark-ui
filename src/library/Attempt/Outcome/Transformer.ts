import type {
  Attempt_Error_Actionable,
} from '../error';

import type {
  Attempt_Failure_Transformer,
} from './Failure/Transformer';

import type {
  Attempt_Success_Transformer,
} from './Success/Transformer';

type Attempt_Outcome_Transformer<
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error_Actionable<string>,
  SomeTransformedProduct,
  SomeTransformedActionableError extends Attempt_Error_Actionable<string>,
> =
  | (
    & Required<
      Attempt_Success_Transformer<
        SomeTransformableProduct,
        SomeTransformedProduct
      >
    >
    & Partial<
      Attempt_Failure_Transformer<
        SomeTransformableActionableError,
        SomeTransformedActionableError
      >
    >
  )
  | (
    & Partial<
      Attempt_Success_Transformer<
        SomeTransformableProduct,
        SomeTransformedProduct
      >
    >
    & Required<
      Attempt_Failure_Transformer<
        SomeTransformableActionableError,
        SomeTransformedActionableError
      >
    >
  )
;

export {
  type Attempt_Outcome_Transformer,
};
