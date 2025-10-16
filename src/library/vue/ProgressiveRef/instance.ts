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
  retrieveExit: () => Promise<
    Exit.Exit<SomeProduct, SomeFailure>
  >,
): ProgressiveRef<
  SomeProduct,
  SomeFailure
> => {
  const flagIsRaised = ref(false);

  type CapturedExit = Exit.Exit<
    SomeProduct,
    SomeFailure
  >;

  const capturedExit = ref(Option.none()) as Ref<Option.Option<CapturedExit>>;

  const captureExit = async (): Promise<void> => {
    using cleanup = new DisposableStack();

    set(capturedExit, Option.none());
    set(flagIsRaised, true);

    cleanup.defer(() => {
      set(flagIsRaised, false);
    });

    const retrievedExit = await Effect.runPromise(Effect.promise(retrieveExit));
    set(capturedExit, Option.some(retrievedExit));
  };

  return {
    initiate: captureExit,
    get isInProgress() {
      return get(flagIsRaised);
    },
    get result() {
      if (
        this.isInProgress
      ) return Option.none();

      return get(capturedExit);
    },
  };
};

export {
  progressiveRef,
};
