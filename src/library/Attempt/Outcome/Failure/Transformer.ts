import type {
  Actionable as Attempt_Error_Actionable,
} from '../../Error';

import type {
  Transformer as Attempt_Outcome_Failure_Cause_Transformer,
} from './Cause';

interface Attempt_Outcome_Failure_Transformer<
  SomeTransformableActionableError extends Attempt_Error_Actionable<string>,
  SomeTransformedActionableError extends Attempt_Error_Actionable<string>,
> {
  cause: Attempt_Outcome_Failure_Cause_Transformer<
    SomeTransformableActionableError,
    SomeTransformedActionableError
  >;
}

export type {
  Attempt_Outcome_Failure_Transformer,
};
