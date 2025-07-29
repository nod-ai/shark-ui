import type Attempt_ErrorInterpreter from '../error/Interpreter';

import type {
  ActionableError,
} from '../error/exports';

interface Attempt_AdapterConfig<
  SomeActionableError extends ActionableError<string>,
> {
  interpretationOf: Attempt_ErrorInterpreter<SomeActionableError>;
}

export type {
  Attempt_AdapterConfig as default,
};
