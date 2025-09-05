import type {
  Attempt_Error,
} from '../Error';

import {
  Attempt_Outcome_Failure,
} from './Failure';

import {
  Attempt_Outcome_Success,
} from './Success';

import {
  Attempt_Outcome_fromRewrapping,
} from './fromRewrapping';

type Attempt_Outcome<
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
> =
  | Attempt_Outcome_Success<SomeProduct>
  | Attempt_Outcome_Failure<SomeActionableError>
;

const Attempt_Outcome = {
  Failure       : Attempt_Outcome_Failure,
  Success       : Attempt_Outcome_Success,
  fromRewrapping: Attempt_Outcome_fromRewrapping,
};

export {
  Attempt_Outcome,
};
