import type * as Attempt_Error from '../../Error';

import type * as Attempt_Outcome_Failure_Cause from './Cause';

interface Attempt_Outcome_Failure_Transformer<
  SomeTransformableActionableError extends Attempt_Error.Actionable<string>,
  SomeTransformedActionableError extends Attempt_Error.Actionable<string>,
> {
  cause: Attempt_Outcome_Failure_Cause.Transformer<
    SomeTransformableActionableError,
    SomeTransformedActionableError
  >;
}

export type {
  Attempt_Outcome_Failure_Transformer,
};
