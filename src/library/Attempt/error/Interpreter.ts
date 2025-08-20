import type Attempt_ActionableError from './ActionableError';

import type {
  PotentiallyActionable,
} from './modifier';

type Attempt_ErrorInterpreter<
  SomeActionableError extends Attempt_ActionableError<string>,
> = (
  caughtError: PotentiallyActionable<Error>
) => SomeActionableError | null;

export type {
  Attempt_ErrorInterpreter as default,
};
