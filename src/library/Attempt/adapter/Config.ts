import type {
  ActionableError,
} from '../error';

import type Attempt_ErrorInterpreter from '../error/Interpreter';

interface Attempt_AdapterConfig<
  SomeActionableError extends ActionableError<string>,
> {
  interpretationOf: Attempt_ErrorInterpreter<SomeActionableError>;
}

export {
  type Attempt_AdapterConfig as default,
};
