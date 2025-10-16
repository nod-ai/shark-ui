import type {
  Exit,
  Option,
} from 'effect';

import type Attempt from '@/library/Attempt';

interface ProgressiveRef<
  SomeProduct,
  SomeActionableError extends Attempt.Error.Actionable,
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
  ProgressiveRef,
};
