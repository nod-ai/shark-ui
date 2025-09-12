import type {
  Attempt_Error_Actionable,
} from './Actionable';

import type {
  PotentiallyActionable,
} from './modifiers';

type Attempt_Error_Interpreter<
  SomeActionableError extends Attempt_Error_Actionable<string>,
> = (
  caughtError: PotentiallyActionable<Error>
) => SomeActionableError | null;

export type {
  Attempt_Error_Interpreter,
};
