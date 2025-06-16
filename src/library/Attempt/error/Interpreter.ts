import type ActionableError from './ActionableError';

type Attempt_ErrorInterpreter<
  SomeActionableError extends ActionableError<string>,
> = (
  caughtError: Error
) => SomeActionableError | null;

export {
  type Attempt_ErrorInterpreter as default,
};
