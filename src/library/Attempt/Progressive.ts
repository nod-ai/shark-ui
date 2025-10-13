import type {
  Option,
} from 'effect';

import type {
  Attempt_Error,
} from './Error';

import type {
  Attempt_Outcome,
} from './Outcome';

interface Attempt_Progressive<
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
> {
  initiate: () => Promise<void>;
  isInProgress: boolean;
  outcome: Option.Option<
    Attempt_Outcome<
      SomeProduct,
      SomeActionableError
    >
  >;
}

export type {
  Attempt_Progressive,
};
