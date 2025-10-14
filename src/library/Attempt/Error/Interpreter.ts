import type {
  Option,
} from 'effect';

import type {
  Attempt_Error_Actionable,
} from './Actionable';

import type {
  PotentiallyActionable,
} from './modifiers';

type Attempt_Error_Interpreter<
  SomeActionableError extends Attempt_Error_Actionable,
> = (
  caughtError: PotentiallyActionable<Error>
) => Option.Option<SomeActionableError>;

export type {
  Attempt_Error_Interpreter,
};
