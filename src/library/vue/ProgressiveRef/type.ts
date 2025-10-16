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
  result: Option.Option<
    Exit.Exit<
      SomeProduct,
      SomeFailure
    >
  >;
}

export type {
  ProgressiveRef,
};
