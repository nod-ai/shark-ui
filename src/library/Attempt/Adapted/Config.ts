import type {
  Attempt_Error,
} from '../Error';

interface Attempt_Adapted_Config<
  SomeActionableError extends Attempt_Error.Actionable,
> {
  interpretationOf: Attempt_Error.Interpreter<SomeActionableError>;
}

export type {
  Attempt_Adapted_Config,
};
