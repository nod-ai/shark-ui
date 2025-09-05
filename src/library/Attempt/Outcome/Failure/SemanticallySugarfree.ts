import type {
  Actionable as Attempt_Error_Actionable,
} from '../../Error';

import type {
  Attempt_Outcome_Discriminable,
} from '../Discriminable';

interface Attempt_Outcome_Failure_SemanticallySugarfree<
  SomeActionableError extends Attempt_Error_Actionable<string>,
> extends Attempt_Outcome_Discriminable<
    'failure',
    SomeActionableError
  > {
  readonly cause: SomeActionableError;
}

export type {
  Attempt_Outcome_Failure_SemanticallySugarfree,
};
