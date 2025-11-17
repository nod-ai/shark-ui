import type {
  Either,
  Option,
} from 'effect';

interface ProgressiveRef<
  SomeProduct,
  SomeFailure,
> {
  initiate: () => Promise<void>;
  isInProgress: boolean;
  output: Option.Option<
    Either.Either<
      SomeProduct,
      SomeFailure
    >
  >;
}

export type {
  ProgressiveRef,
};
