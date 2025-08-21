import type {
  Attempt_Error_Actionable,
} from '../Error';

import type Attempt_Error_Interpreter from '../Error/Interpreter';

interface Attempt_Adapted_Config<
  SomeActionableError extends Attempt_Error_Actionable<string>,
> {
  interpretationOf: Attempt_Error_Interpreter<SomeActionableError>;
}

export type {
  Attempt_Adapted_Config as default,
};
