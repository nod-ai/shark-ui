import {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Outcome_Failure,
} from './Failure';

import type {
  Attempt_Outcome_Success,
} from './Success';

type Attempt_Outcome<
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
> =
  | Attempt_Outcome_Success<SomeProduct>
  | Attempt_Outcome_Failure<SomeActionableError>
;

function Attempt_Outcome(
  namespaceOnly: never = Attempt_Error.NonActionable.throw(
    `Unexpected call of module augmentation provision for ${Attempt_Outcome.name}.`,
  ),
) {
  return namespaceOnly;
}

export {
  Attempt_Outcome,
};
