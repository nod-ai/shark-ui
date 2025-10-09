import {
  Attempt_Outcome_Failure,
} from './Failure';

import {
  Attempt_Outcome_Success,
} from './Success';

import {
  Attempt_Outcome_abandon,
} from './abandon';

import {
  Attempt_Outcome,
} from './definition.declared.ts';

import {
  Attempt_Outcome_failDueTo,
} from './failDueTo';

import {
  Attempt_Outcome_fromRewrapping,
} from './fromRewrapping';

import {
  Attempt_Outcome_succeedWith,
} from './succeedWith';

Attempt_Outcome.succeedWith /*   */ = Attempt_Outcome_succeedWith;
Attempt_Outcome.failDueTo /*     */ = Attempt_Outcome_failDueTo;
Attempt_Outcome.abandon /*       */ = Attempt_Outcome_abandon;
Attempt_Outcome.Failure /*       */ = Attempt_Outcome_Failure;
Attempt_Outcome.Success /*       */ = Attempt_Outcome_Success;
Attempt_Outcome.fromRewrapping /**/ = Attempt_Outcome_fromRewrapping;

declare module './definition.declared.ts' {
  namespace Attempt_Outcome {
    export {
      Attempt_Outcome_succeedWith /*   */ as succeedWith,
      Attempt_Outcome_failDueTo /*     */ as failDueTo,
      Attempt_Outcome_abandon /*       */ as abandon,
      Attempt_Outcome_Failure /*       */ as Failure,
      Attempt_Outcome_Success /*       */ as Success,
      Attempt_Outcome_fromRewrapping /**/ as fromRewrapping,
    };
  }
}
