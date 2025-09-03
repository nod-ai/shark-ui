import type {
  Attempt_Error_Actionable,
} from '../../Error';

import type {
  Attempt_Outcome,
  Attempt_Outcome_Failure,
} from '../definition.ts';

type CauseOf<
  SomeOutcome extends Attempt_Outcome<unknown, Attempt_Error_Actionable<string>>,
> = SomeOutcome extends Attempt_Outcome_Failure<infer NestedError>
  ? NestedError
  : never;

export type {
  CauseOf,
};
