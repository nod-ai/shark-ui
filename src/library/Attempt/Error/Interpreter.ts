import type Attempt_Error_Actionable from './ActionableError';

import type {
  PotentiallyActionable,
} from './modifier';

type Attempt_ErrorInterpreter<
  SomeActionableError extends Attempt_Error_Actionable<string>,
> = (
  caughtError: PotentiallyActionable<Error>
) => SomeActionableError | null;

export type {
  Attempt_ErrorInterpreter as default,
};
