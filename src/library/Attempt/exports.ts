import {
  Attempt_ended,
} from './ended';

export const abandon = Attempt_ended.inFlamesBecause;

export {
  default as Outcome,
} from './Outcome';

export {
  attemptTo as to,
  attemptToEventually as toEventually,
  attemptToSettle as toSettle,
} from './adapter';

export {
  NonActionableError,
  ActionableError,
} from './error';

export {
  Attempt_that as that,
  Attempt_thatEventually as thatEventually,
} from './factory';
