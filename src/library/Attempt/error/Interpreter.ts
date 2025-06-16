import type ActionableError from './ActionableError';

import type {
  PotentiallyActionable,
} from './modifier';

type Attempt_ErrorInterpreter<
  SomeActionableError extends ActionableError<string>,
> = (
  caughtError: PotentiallyActionable<Error>
) => SomeActionableError | null;

export {
  type Attempt_ErrorInterpreter as default,
};
