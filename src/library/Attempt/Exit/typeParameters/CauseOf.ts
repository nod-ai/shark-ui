import type {
  Exit,
} from 'effect';

import type {
  Attempt_Error,
} from '../../Error';

type CauseOf<
  SomeExit extends Exit.Exit<unknown, Attempt_Error.Actionable>,
> = SomeExit extends Exit.Failure<never, infer NestedError>
  ? NestedError
  : never;

export type {
  CauseOf,
};
