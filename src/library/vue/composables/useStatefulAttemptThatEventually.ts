import {
  get,
  ref,
  set,
  type Ref,
} from '@/library/vue';

import {
  Option,
} from 'effect';

import Attempt from '@/library/Attempt';

/** Useful when state of UI is dependent on some async operation and the outcome upon completion */
const useStatefulAttemptThatEventually = <
  SomeProduct,
  SomeActionableError extends Attempt.Error.Actionable<string>,
>(
  retrieveOutcome: Attempt.End.Retriever<
    Attempt.Outcome<SomeProduct, SomeActionableError>
  >,
): Attempt.Progressive<
  SomeProduct,
  SomeActionableError
> => {
  const flagIsRaised = ref(false);

  type CapturedOutcome = Attempt.Outcome<
    SomeProduct,
    SomeActionableError
  >;

  const capturedOutcome = ref(Option.none()) as Ref<Option.Option<CapturedOutcome>>;

  const captureOutcome = async (): Promise<void> => {
    using cleanup = new DisposableStack();

    set(capturedOutcome, Option.none());
    set(flagIsRaised, true);

    cleanup.defer(() => {
      set(flagIsRaised, false);
    });

    const retrievedOutcome = await Attempt.Fresh.thatEventually(retrieveOutcome);
    set(capturedOutcome, Option.some(retrievedOutcome));
  };

  return {
    initiate: captureOutcome,
    get isInProgress() {
      return get(flagIsRaised);
    },
    get outcome() {
      if (
        this.isInProgress
      ) return Option.none();

      return get(capturedOutcome);
    },
  };
};

export {
  useStatefulAttemptThatEventually,
};
