import type {
  Exit,
} from 'effect';

import type {
  Attempt_Error,
} from '../Error';

type Attempt_End_Getter<
  SomeInferredExit extends Exit.Exit<unknown, Attempt_Error.Actionable>,
> = () => SomeInferredExit;

export type {
  Attempt_End_Getter,
};
