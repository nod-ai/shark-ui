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
  Attempt_Outcome_isSuccess,
} from './isSuccess';

import {
  Attempt_Outcome_map,
} from './map';

import {
  Attempt_Outcome_mapBoth,
} from './mapBoth';

import {
  Attempt_Outcome_mapErrorCause,
} from './mapErrorCause';

import {
  Attempt_Outcome_succeed,
} from './succeed';

Attempt_Outcome.isSuccess /*    */ = Attempt_Outcome_isSuccess;
Attempt_Outcome.succeed /*      */ = Attempt_Outcome_succeed;
Attempt_Outcome.failCause /*    */ = Attempt_Outcome_failCause;
Attempt_Outcome.die /*          */ = Attempt_Outcome_die;
Attempt_Outcome.Failure /*      */ = Attempt_Outcome_Failure;
Attempt_Outcome.Success /*      */ = Attempt_Outcome_Success;
Attempt_Outcome.map /*          */ = Attempt_Outcome_map;
Attempt_Outcome.mapBoth /*      */ = Attempt_Outcome_mapBoth;
Attempt_Outcome.mapErrorCause /**/ = Attempt_Outcome_mapErrorCause;

declare module './definition.declared.ts' {
  namespace Attempt_Outcome {
    export {
      Attempt_Outcome_isSuccess /*    */ as isSuccess,
      Attempt_Outcome_succeed /*      */ as succeed,
      Attempt_Outcome_failCause /*    */ as failCause,
      Attempt_Outcome_die /*          */ as die,
      Attempt_Outcome_Failure /*      */ as Failure,
      Attempt_Outcome_Success /*      */ as Success,
      Attempt_Outcome_map /*          */ as map,
      Attempt_Outcome_mapBoth /*      */ as mapBoth,
      Attempt_Outcome_mapErrorCause /**/ as mapErrorCause,
    };
  }
}
