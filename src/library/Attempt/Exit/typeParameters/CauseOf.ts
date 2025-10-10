import type {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Exit_Failure,
} from '../Failure';

import type {
  Attempt_Exit,
} from '../definition.declared.ts';

type CauseOf<
  SomeOutcome extends Attempt_Exit<unknown, Attempt_Error.Actionable<string>>,
> = SomeOutcome extends Attempt_Exit_Failure<infer NestedError>
  ? NestedError
  : never;

export type {
  CauseOf,
};
