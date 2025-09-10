import type * as Attempt_Error from '../Error';

interface Attempt_Adapted_Config<
  SomeActionableError extends Attempt_Error.Actionable<string>,
> {
  interpretationOf: Attempt_Error.Interpreter<SomeActionableError>;
}

export type {
  Attempt_Adapted_Config,
};
