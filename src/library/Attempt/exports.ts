import {
  Attempt_ended,
} from './ended';

const abandon = Attempt_ended.inFlamesBecause;

export {
  abandon,
};

export {
  default as Outcome,
} from './Outcome';

export {
  attemptTo as to,
  attemptToEventually as toEventually,
  attemptToSettle as toSettle,
  type AdapterConfig,
} from './adapter';

export {
  NonActionableError,
  ActionableError,
  type ErrorInterpreter,
} from './error';

export {
  Attempt_that as that,
  Attempt_thatEventually as thatEventually,
  type Attempt_EndGetter as EndGetter,
  type Attempt_EndRetriever as EndRetriever,
} from './factory';
