import type {
  Attempt_Error_Actionable,
} from '../error';

import type Attempt_Error_Interpreter from '../error/Interpreter';

interface Attempt_AdapterConfig<
  SomeActionableError extends Attempt_Error_Actionable<string>,
> {
  interpretationOf: Attempt_Error_Interpreter<SomeActionableError>;
}

export type {
  Attempt_AdapterConfig as default,
};
