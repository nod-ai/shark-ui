import {
  get,
  ref,
  set,
  type Ref,
} from '@/library/vue';

import Attempt from '@/library/Attempt';

/** Useful when state of UI is dependent on some async operation and the outcome upon completion */
const useStatefulAttemptThatEventually = <
  SomeProduct,
  SomeActionableError extends Attempt.Error_Actionable<string>,
>(
  retrieveOutcome: Attempt.End_Retriever<
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

  const capturedOutcome: Ref<CapturedOutcome | null> = ref(null);

  const captureOutcome = async (): Promise<void> => {
    using cleanup = new DisposableStack();

    set(capturedOutcome, null);
    set(flagIsRaised, true);

    cleanup.defer(() => {
      set(flagIsRaised, false);
    });

    const retrievedOutcome = await Attempt.Fresh_thatEventually(retrieveOutcome);
    set(capturedOutcome, retrievedOutcome);
  };

  return {
    initiate: captureOutcome,
    get isInProgress() {
      return get(flagIsRaised);
    },
    get outcome() {
      if (
        this.isInProgress
      ) return null;

      return get(capturedOutcome);
    },
  };
};

export {
  useStatefulAttemptThatEventually,
};
