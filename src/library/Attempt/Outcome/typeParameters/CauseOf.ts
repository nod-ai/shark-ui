import type * as Attempt_Error from '../../Error';

import type {
  Attempt_Outcome_Failure,
} from '../Failure';

import type {
  Attempt_Outcome,
} from '../definition.ts';

type CauseOf<
  SomeOutcome extends Attempt_Outcome<unknown, Attempt_Error.Actionable<string>>,
> = SomeOutcome extends Attempt_Outcome_Failure<infer NestedError>
  ? NestedError
  : never;

export type {
  CauseOf,
};
