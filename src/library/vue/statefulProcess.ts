import {
  get,
  ref,
  set,
  type Ref,
} from '@/library/vue/reactivity.ts';

interface StatefulProcess<
  SomeResult,
> {
  initiate: () => Promise<void>;
  isInProgress: boolean;
  result: SomeResult | null;
}

/** Useful when state of UI is dependent on some async operation and its result */
export const useStatefulProcess = <
  SomeResult,
>(
  forciblyPerformFlaggableProcess: () => Promise<SomeResult>,
): StatefulProcess<SomeResult> => {
  const flagIsRaised = ref(false);

  const capturedResult: Ref<SomeResult | null> = ref(null);

  const forciblyPerformFlaggedProcess = async (): Promise<void> => {
    using cleanup = new DisposableStack();

    set(capturedResult, null);
    set(flagIsRaised, true);

    cleanup.defer(() => {
      set(flagIsRaised, false);
    });

    const resultOfProcess = await forciblyPerformFlaggableProcess();
    set(capturedResult, resultOfProcess);
  };

  return {
    initiate: forciblyPerformFlaggedProcess,
    get isInProgress() {
      return get(flagIsRaised);
    },
    get result() {
      if (
        this.isInProgress
      ) return null;

      return get(capturedResult);
    },
  };
};
