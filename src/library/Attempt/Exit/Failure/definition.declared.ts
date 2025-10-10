import {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Outcome_Failure_SemanticallySugarfree,
} from './SemanticallySugarfree';

type Attempt_Outcome_Failure<
  SomeActionableError extends Attempt_Error.Actionable<string>,
> = Attempt_Outcome_Failure_SemanticallySugarfree<
  SomeActionableError
>;

function Attempt_Outcome_Failure(
  namespaceOnly: never = Attempt_Error.NonActionable.throw(
    `Unexpected call of module augmentation provision for "${Attempt_Outcome_Failure.name}".`,
  ),
): never {
  return namespaceOnly;
}

export {
  Attempt_Outcome_Failure,
};
