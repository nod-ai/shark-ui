import type {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Outcome_Discriminable,
} from '../Discriminable';

interface Attempt_Outcome_Failure_SemanticallySugarfree<
  SomeActionableError extends Attempt_Error.Actionable<string>,
>
  extends Attempt_Outcome_Discriminable<
    'failure'
  > {
  readonly cause: SomeActionableError;
}

export type {
  Attempt_Outcome_Failure_SemanticallySugarfree,
};
