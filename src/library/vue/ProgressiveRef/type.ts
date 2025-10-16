import type {
  Exit,
  Option,
} from 'effect';

interface ProgressiveRef<
  SomeProduct,
  SomeActionableError,
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
