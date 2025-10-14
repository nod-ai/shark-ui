import type {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Exit_Exit,
} from '../Exit';

import type {
  Attempt_Exit_Failure,
} from '../Failure';

type CauseOf<
  SomeExit extends Attempt_Exit_Exit<unknown, Attempt_Error.Actionable<string>>,
> = SomeExit extends Attempt_Exit_Failure<infer NestedError>
  ? NestedError
  : never;

export type {
  CauseOf,
};
