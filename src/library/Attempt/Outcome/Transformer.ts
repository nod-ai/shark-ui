import type {
  Actionable as Attempt_Error_Actionable,
} from '../Error';

import type {
  Attempt_Outcome_Failure_Transformer,
} from './Failure';

import type {
  Attempt_Outcome_Success_Transformer,
} from './Success';

type Attempt_Outcome_Transformer<
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error_Actionable<string>,
  SomeTransformedProduct,
  SomeTransformedActionableError extends Attempt_Error_Actionable<string>,
> =
  | (
    & Required<
      Attempt_Outcome_Success_Transformer<
        SomeTransformableProduct,
        SomeTransformedProduct
      >
    >
    & Partial<
      Attempt_Outcome_Failure_Transformer<
        SomeTransformableActionableError,
        SomeTransformedActionableError
      >
    >
  )
  | (
    & Partial<
      Attempt_Outcome_Success_Transformer<
        SomeTransformableProduct,
        SomeTransformedProduct
      >
    >
    & Required<
      Attempt_Outcome_Failure_Transformer<
        SomeTransformableActionableError,
        SomeTransformedActionableError
      >
    >
  )
;

export type {
  Attempt_Outcome_Transformer,
};
