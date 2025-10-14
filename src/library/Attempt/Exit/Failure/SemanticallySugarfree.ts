import type {
  Cause,
} from 'effect';

import type {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Exit_Discriminable,
} from '../Discriminable';

interface Attempt_Exit_Failure_SemanticallySugarfree<
  SomeActionableError extends Attempt_Error.Actionable<string>,
>
  extends Attempt_Exit_Discriminable<
    'failure'
  > {
  readonly cause: Cause.Cause<SomeActionableError>;
}

export type {
  Attempt_Exit_Failure_SemanticallySugarfree,
};
