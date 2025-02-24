import {
  get,
  ref,
  set,
} from '@/library/vue/reactivity.ts';

export const useStatefulProcess = (
  tryToPerformFlaggableProcess: () => Promise<void>,
): ({
    try: () => Promise<void>;
    isInProgress: boolean;
  }) => {
  const flagIsRaised = ref(false);

  const tryToPerformFlaggedProcess = async () => {
    set(flagIsRaised, true);

    try {
      await tryToPerformFlaggableProcess();
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
  };
};
