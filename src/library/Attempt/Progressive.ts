import type {
  Exit,
  Option,
} from 'effect';

import type {
  Attempt_Error,
} from './Error';

interface Attempt_Progressive<
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable,
> {
  initiate: () => Promise<void>;
  isInProgress: boolean;
  result: Option.Option<
    Exit.Exit<
      SomeProduct,
      SomeActionableError
    >
  >;
}

export type {
  Attempt_Progressive,
};
