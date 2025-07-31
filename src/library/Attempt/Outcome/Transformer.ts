import type {
  ActionableError,
} from '../error';

import type {
  Attempt_Failure_Transformer,
} from './Failure/Transformer';

import type {
  Attempt_Success_Transformer,
} from './Success/Transformer';

type Attempt_Outcome_Transformer<
  TransformableProduct,
  TransformableActionableError extends ActionableError<string>,
  TransformedProduct,
  TransformedActionableError extends ActionableError<string>,
> =
  | (
    & Required<
      Attempt_Success_Transformer<
        TransformableProduct,
        TransformedProduct
      >
    >
    & Partial<
      Attempt_Failure_Transformer<
        TransformableActionableError,
        TransformedActionableError
      >
    >
  )
  | (
    & Partial<
      Attempt_Success_Transformer<
        TransformableProduct,
        TransformedProduct
      >
    >
    & Required<
      Attempt_Failure_Transformer<
        TransformableActionableError,
        TransformedActionableError
      >
    >
  )
;

export {
  type Attempt_Outcome_Transformer,
};
