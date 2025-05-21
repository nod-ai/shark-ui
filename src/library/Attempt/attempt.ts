import Outcome from './Outcome';

import {
  NonActionableError,
} from './error';

/**
 * (noun) Defines the relationship between:
 * - a usable product
 * - an error from which execution can be recovered
 * - an error from which execution cannot be recovered
 */
export const attempt = {
  /** Call this when the attempt has completed and was considered successful */
  succeededWith: Outcome.successThatYielded,
  /** Call this when the attempt has completed and was considered a failure */
  failedDueTo  : Outcome.failureDueTo,
  /** Call this when it's not possible to complete the attempt */
  abandoned    : NonActionableError.throw,
};
