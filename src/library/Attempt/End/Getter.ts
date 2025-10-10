import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit,
} from '../Exit';

type Attempt_End_Getter<
  SomeInferredOutcome extends Attempt_Exit<unknown, Attempt_Error.Actionable<string>>,
> = () => SomeInferredOutcome;

export type {
  Attempt_End_Getter,
};
