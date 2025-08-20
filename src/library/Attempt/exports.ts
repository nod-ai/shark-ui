import {
  Attempt_ended,
} from './ended';

const Attempt_abandon = Attempt_ended.inFlamesBecause;

export {
  Attempt_abandon as abandon,
};

export {
  Attempt_Outcome as Outcome,
  type Attempt_Success as Success,
  type Attempt_Failure as Failure,
} from './Outcome';

export {
  Attempt_to as to,
  Attempt_toEventually as toEventually,
  Attempt_toSettle as toSettle,
  type Attempt_AdapterConfig as AdapterConfig,
} from './adapter';

export {
  Attempt_NonActionableError as NonActionableError,
  Attempt_ActionableError as ActionableError,
  type Attempt_ErrorInterpreter as ErrorInterpreter,
} from './error';

export {
  Attempt_that as that,
  Attempt_thatEventually as thatEventually,
  type Attempt_EndGetter as EndGetter,
  type Attempt_EndRetriever as EndRetriever,
} from './factory';
