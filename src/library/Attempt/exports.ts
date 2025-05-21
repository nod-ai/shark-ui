import {
  attempt,
} from './attempt';

export const abandon = attempt.abandoned;

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
  Attempt_sync as new,
  Attempt_async as promised,
} from './factory';
