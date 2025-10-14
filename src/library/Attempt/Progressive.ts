import type {
  Option,
} from 'effect';

import type {
  Attempt_Error,
} from './Error';

import type {
  Attempt_Exit,
} from './Exit';

interface Attempt_Progressive<
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable,
> {
  initiate: () => Promise<void>;
  isInProgress: boolean;
  result: Option.Option<
    Attempt_Exit.Exit<
      SomeProduct,
      SomeActionableError
    >
  >;
}

export type {
  Attempt_Progressive,
};
