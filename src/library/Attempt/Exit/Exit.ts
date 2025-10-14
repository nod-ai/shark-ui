import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit_Failure,
} from './Failure';

import type {
  Attempt_Exit_Success,
} from './Success';

type Attempt_Exit_Exit<
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable,
> =
  | Attempt_Exit_Success<SomeProduct>
  | Attempt_Exit_Failure<SomeActionableError>
;

export type {
  Attempt_Exit_Exit,
};
