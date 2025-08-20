import {
  Attempt_Outcome,
} from './Outcome';

import {
  Attempt_NonActionableError,
} from './error';

/**
 * (noun) Defines the relationship between:
 * - a usable product
 * - an error from which execution can be recovered
 * - an error from which execution cannot be recovered
*/
const Attempt_ended = {
  /** Call this when the attempt has completed and was considered successful */
  inSuccessWith  : Attempt_Outcome.successThatYielded,
  /** Call this when the attempt has completed and was considered a failure */
  inFailureDueTo : Attempt_Outcome.failureDueTo,
  /** Call this when the attempt has completed in terms of a prior outcome */
  inTermsOf      : Attempt_Outcome.fromRewrapping,
  /** Call this when it's not possible to complete the attempt */
  inFlamesBecause: Attempt_NonActionableError.throw.bind(Attempt_NonActionableError),
};

export {
  Attempt_ended,
};
