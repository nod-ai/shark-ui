import type * as Attempt_Error from '../Error';

import type {
  Attempt_Outcome,
} from '../Outcome';

import type {
  Attempt_ended as handles,
} from '../ended';

type Attempt_End_Retriever<
  SomeInferredOutcome extends Attempt_Outcome<unknown, Attempt_Error.Actionable<string>>,
> = (
  givenHandles: typeof handles
) => Promise<SomeInferredOutcome>;

export type {
  Attempt_End_Retriever,
};
