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

import type Attempt from '@/library/Attempt';

/** Useful when state of UI is dependent on some async operation and the result upon completion */
const progressiveRef = <
  SomeProduct,
  SomeActionableError extends Attempt.Error.Actionable,
>(
  retrieveExit: () => Promise<
    Exit.Exit<SomeProduct, SomeActionableError>
  >,
): Attempt.Progressive<
  SomeProduct,
  SomeActionableError
> => {
  const flagIsRaised = ref(false);

  type CapturedExit = Exit.Exit<
    SomeProduct,
    SomeActionableError
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
