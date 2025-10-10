import {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Outcome_Failure_Cause,
} from './Cause';

import type {
  Attempt_Outcome_Failure_SemanticallySugarfree,
} from './SemanticallySugarfree';

interface Attempt_Outcome_Failure<
  SomeActionableError extends Attempt_Error.Actionable<string>,
>
  extends Attempt_Outcome_Failure_SemanticallySugarfree<
    SomeActionableError
  > {
  rewrappedWith<
    SomeTransformedActionableError extends Attempt_Error.Actionable<string> = SomeActionableError,
  >(
    given?: Attempt_Outcome_Failure_Cause.Transformer<
      SomeActionableError,
      SomeTransformedActionableError
    >
  ): Attempt_Outcome_Failure<SomeTransformedActionableError>;
}

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
