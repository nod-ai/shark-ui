import {
  get,
  ref,
  set,
  type Ref,
} from '@/library/vue';

import {
  Effect,
  type Exit,
  Option,
} from 'effect';

import type {
  ProgressiveRef,
} from './type';

/** Useful when state of UI is dependent on some async operation and the result upon completion */
const progressiveRef = <
  SomeProduct,
  SomeFailure,
>(
  givenOperation: Effect.Effect<SomeProduct, SomeFailure>,
): ProgressiveRef<
  SomeProduct,
  SomeFailure
> => {
  const flagIsRaised = ref(false);

  type CapturedOutput = Exit.Exit<
    SomeProduct,
    SomeFailure
  >;

  const capturedOutput = ref(Option.none()) as Ref<Option.Option<CapturedOutput>>;

  const captureOutput = async (): Promise<void> => {
    using cleanup = new DisposableStack();

    set(capturedOutput, Option.none());
    set(flagIsRaised, true);

    cleanup.defer(() => {
      set(flagIsRaised, false);
    });

    const outputOfOperation = await givenOperation.pipe(
      Effect.exit,
      Effect.runPromise,
    );

    set(capturedOutput, Option.some(outputOfOperation));
  };

  return {
    initiate: captureOutput,
    get isInProgress() {
      return get(flagIsRaised);
    },
    get output() {
      if (
        this.isInProgress
      ) return Option.none();

      return get(capturedOutput);
    },
  };
};

export {
  progressiveRef,
};
