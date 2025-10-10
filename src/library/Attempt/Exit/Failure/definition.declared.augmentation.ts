import {
  Attempt_Outcome_Failure_Cause,
} from './Cause';

import {
  Attempt_Outcome_Failure,
} from './definition.declared.ts';

import {
  Attempt_Outcome_Failure_dueTo,
} from './dueTo';

Attempt_Outcome_Failure.Cause = Attempt_Outcome_Failure_Cause;
Attempt_Outcome_Failure.dueTo = Attempt_Outcome_Failure_dueTo;

declare module './definition.declared.ts' {
  namespace Attempt_Outcome_Failure {
    export {
      /**/ Attempt_Outcome_Failure_Cause /* */ as Cause,
      /**/ Attempt_Outcome_Failure_dueTo /* */ as dueTo,
    };
  }
}
