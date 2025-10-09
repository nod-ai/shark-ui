import {
  Attempt_Outcome_Failure,
} from './Failure';

import {
  Attempt_Outcome_Success,
} from './Success';

import {
  Attempt_Outcome,
} from './definition.declared.ts';

import {
  Attempt_Outcome_die,
} from './die';

import {
  Attempt_Outcome_failCause,
} from './failCause';

import {
  Attempt_Outcome_fromRewrapping,
} from './fromRewrapping';

import {
  Attempt_Outcome_fromRewrappingBoth,
} from './fromRewrappingBoth';

import {
  Attempt_Outcome_fromRewrappingErrorCause,
} from './fromRewrappingErrorCause';

import {
  Attempt_Outcome_succeed,
} from './succeed';

Attempt_Outcome.succeed /*                 */ = Attempt_Outcome_succeed;
Attempt_Outcome.failCause /*               */ = Attempt_Outcome_failCause;
Attempt_Outcome.die /*                     */ = Attempt_Outcome_die;
Attempt_Outcome.Failure /*                 */ = Attempt_Outcome_Failure;
Attempt_Outcome.Success /*                 */ = Attempt_Outcome_Success;
Attempt_Outcome.fromRewrapping /*          */ = Attempt_Outcome_fromRewrapping;
Attempt_Outcome.fromRewrappingBoth /*      */ = Attempt_Outcome_fromRewrappingBoth;
Attempt_Outcome.fromRewrappingErrorCause /**/ = Attempt_Outcome_fromRewrappingErrorCause;

declare module './definition.declared.ts' {
  namespace Attempt_Outcome {
    export {
      Attempt_Outcome_succeed /*                 */ as succeed,
      Attempt_Outcome_failCause /*               */ as failCause,
      Attempt_Outcome_die /*                     */ as die,
      Attempt_Outcome_Failure /*                 */ as Failure,
      Attempt_Outcome_Success /*                 */ as Success,
      Attempt_Outcome_fromRewrapping /*          */ as fromRewrapping,
      Attempt_Outcome_fromRewrappingBoth /*      */ as fromRewrappingBoth,
      Attempt_Outcome_fromRewrappingErrorCause /**/ as fromRewrappingErrorCause,
    };
  }
}
