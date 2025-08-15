import {
  Attempt_Outcome_Failure_Cause,
} from './Cause';

import {
  Attempt_Outcome_Failure,
} from './definition.ts';

Attempt_Outcome_Failure.Cause = Attempt_Outcome_Failure_Cause;

declare module './definition.ts' {
  namespace Attempt_Outcome_Failure {
    export {
      Attempt_Outcome_Failure_Cause as Cause,
    };
  }
}
