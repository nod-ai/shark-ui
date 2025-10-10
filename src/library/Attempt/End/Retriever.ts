import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit,
} from '../Exit';

type Attempt_End_Retriever<
  SomeInferredExit extends Attempt_Exit<unknown, Attempt_Error.Actionable<string>>,
> = () => Promise<SomeInferredExit>;

export type {
  Attempt_End_Retriever,
};
