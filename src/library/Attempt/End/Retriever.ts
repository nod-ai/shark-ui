import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Outcome,
} from '../Outcome';

type Attempt_End_Retriever<
  SomeInferredOutcome extends Attempt_Outcome<unknown, Attempt_Error.Actionable<string>>,
> = () => Promise<SomeInferredOutcome>;

export type {
  Attempt_End_Retriever,
};
