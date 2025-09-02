import type {
  Attempt_Error_Actionable,
} from '../../Error';

import {
  type Attempt_Outcome_Failure_Cause_Transformer,
  /**/ Attempt_Outcome_Failure_Cause_Transformer_identity,
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

export {
  type Attempt_Outcome_Failure_Transformer,
  Attempt_Outcome_Failure_Cause_Transformer_identity,
};
