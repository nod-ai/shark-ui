import type * as Attempt_Error from './Error';

import type {
  Attempt_Outcome,
} from './Outcome';

interface Attempt_Progressive<
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
> {
  initiate: () => Promise<void>;
  isInProgress: boolean;
  outcome: Attempt_Outcome<
    SomeProduct,
    SomeActionableError
  > | null;
}

export type {
  Attempt_Progressive,
};
