import type {
  Actionable as Attempt_Error_Actionable,
} from '../Error';

import {
  type Attempt_Outcome_Failure,
  Attempt_Outcome_Failure_dueTo,
} from './Failure';

import {
  type Attempt_Outcome_Success,
  Attempt_Outcome_Success_thatYielded,
} from './Success';

import {
  Attempt_Outcome_fromRewrapping,
} from './fromRewrapping';

type Attempt_Outcome<
  SomeProduct,
  SomeActionableError extends Attempt_Error_Actionable<string>,
> =
  | Attempt_Outcome_Success<SomeProduct>
  | Attempt_Outcome_Failure<SomeActionableError>
;

const Attempt_Outcome = {
  Failure_dueTo      : Attempt_Outcome_Failure_dueTo,
  Success_thatYielded: Attempt_Outcome_Success_thatYielded,
  fromRewrapping     : Attempt_Outcome_fromRewrapping,
};

export {
  Attempt_Outcome,
};
