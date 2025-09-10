import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Outcome_Failure,
} from './Failure';

import type {
  Attempt_Outcome_Success_Transformer,
} from './Success';

type Attempt_Outcome_Transformer<
  SomeTransformableProduct,
  SomeTransformableActionableError extends Attempt_Error.Actionable<string>,
  SomeTransformedProduct,
  SomeTransformedActionableError extends Attempt_Error.Actionable<string>,
> =
  | (
    & Required<
      Attempt_Outcome_Success_Transformer<
        SomeTransformableProduct,
        SomeTransformedProduct
      >
    >
    & Partial<
      Attempt_Outcome_Failure.Transformer<
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
      Attempt_Outcome_Failure.Transformer<
        SomeTransformableActionableError,
        SomeTransformedActionableError
      >
    >
  )
;

export type {
  Attempt_Outcome_Transformer,
};
