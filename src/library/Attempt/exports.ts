import {
  Attempt_ended,
} from './ended';

const abandon = Attempt_ended.inFlamesBecause;

export {
  abandon,
};

export {
  Attempt_Outcome as Outcome,
  type Attempt_Success as Success,
  type Attempt_Failure as Failure,
} from './Outcome/exports';

export {
  attemptTo as to,
  attemptToEventually as toEventually,
  attemptToSettle as toSettle,
  type AdapterConfig,
} from './adapter/exports';

export {
  NonActionableError,
  ActionableError,
  type ErrorInterpreter,
} from './error/exports';

export {
  Attempt_that as that,
  Attempt_thatEventually as thatEventually,
  type Attempt_EndGetter as EndGetter,
  type Attempt_EndRetriever as EndRetriever,
} from './factory/exports';
