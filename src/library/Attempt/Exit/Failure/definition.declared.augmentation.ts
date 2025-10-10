import {
  Attempt_Exit_Failure_Cause,
} from './Cause';

import {
  Attempt_Exit_Failure,
} from './definition.declared.ts';

import {
  Attempt_Exit_Failure_dueTo,
} from './dueTo';

Attempt_Exit_Failure.Cause = Attempt_Exit_Failure_Cause;
Attempt_Exit_Failure.dueTo = Attempt_Exit_Failure_dueTo;

declare module './definition.declared.ts' {
  namespace Attempt_Exit_Failure {
    export {
      /**/ Attempt_Exit_Failure_Cause /* */ as Cause,
      /**/ Attempt_Exit_Failure_dueTo /* */ as dueTo,
    };
  }
}
