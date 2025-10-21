import type {
  Exit,
  Option,
} from 'effect';

interface ProgressiveRef<
  SomeProduct,
  SomeFailure,
> {
  initiate: () => Promise<void>;
  isInProgress: boolean;
  output: Option.Option<
    Exit.Exit<
      SomeProduct,
      SomeFailure
    >
  >;
}

export type {
  ProgressiveRef,
};
