import {
  Attempt_Outcome_Failure_Cause,
} from './Cause';

import type {
  Attempt_Outcome_Failure_Transformer,
} from './Transformer';

import {
  Attempt_Outcome_Failure,
} from './definition.ts';

import {
  Attempt_Outcome_Failure_dueTo,
} from './dueTo';

Attempt_Outcome_Failure.Cause = Attempt_Outcome_Failure_Cause;
Attempt_Outcome_Failure.dueTo = Attempt_Outcome_Failure_dueTo;

declare module './definition.ts' {
  namespace Attempt_Outcome_Failure {
    export {
      /**/ Attempt_Outcome_Failure_Cause /* */ as Cause,
      type Attempt_Outcome_Failure_Transformer as Transformer,
      /**/ Attempt_Outcome_Failure_dueTo /* */ as dueTo,
    };
  }
}
