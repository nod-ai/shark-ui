import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Outcome,
} from '../Outcome';

type Attempt_End_Getter<
  SomeInferredOutcome extends Attempt_Outcome<unknown, Attempt_Error.Actionable<string>>,
> = () => SomeInferredOutcome;

export type {
  Attempt_End_Getter,
};
