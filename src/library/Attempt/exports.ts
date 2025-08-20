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
  Attempt_Adapted_to as Adapted_to,
  Attempt_Adapted_toEventually as Adapted_toEventually,
  Attempt_Adapted_toSettle as Adapted_toSettle,
  type Attempt_Adapted_Config as Adapted_Config,
} from './adapter';

export {
  Attempt_Error_NonActionable as Error_NonActionable,
  Attempt_Error_Actionable as Error_Actionable,
  type Attempt_Error_Interpreter as Error_Interpreter,
} from './error';

export {
  Attempt_that as that,
  Attempt_thatEventually as thatEventually,
  type Attempt_End_Getter as End_Getter,
  type Attempt_End_Retriever as End_Retriever,
} from './factory';
