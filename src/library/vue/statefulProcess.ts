import {
  get,
  ref,
  set,
  type Ref,
} from '@/library/vue/reactivity.ts';

/** Useful when state of UI is dependent on some async operation and its result */
export const useStatefulProcess = <
  SomeResult,
>(
  tryToPerformFlaggableProcess: () => Promise<SomeResult>,
): ({
  try: () => Promise<void>;
  isInProgress: boolean;
  result: SomeResult | null;
}) => {
  const flagIsRaised = ref(false);

  const capturedResult: Ref<SomeResult | null> = ref(null);

  const tryToPerformFlaggedProcess = async (): Promise<void> => {
    set(flagIsRaised, true);

    try {
      set(capturedResult, null);
      const resultOfProcess = await tryToPerformFlaggableProcess();
      set(capturedResult, resultOfProcess);
    }
    finally {
      set(flagIsRaised, false);
    }
  };

  return {
    try: tryToPerformFlaggedProcess,
    get isInProgress() {
      return get(flagIsRaised);
    },
    get result() {
      return get(capturedResult);
    },
  };
};
