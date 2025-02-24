import {
  get,
  ref,
  set,
} from '@/library/vue/reactivity.ts';

export const useStatefulProcess = <
  SomeResult,
>(
  tryToPerformFlaggableProcess: () => Promise<SomeResult>,
): ({
  try: () => Promise<SomeResult>;
  isInProgress: boolean;
}) => {
  const flagIsRaised = ref(false);

  const tryToPerformFlaggedProcess = async (): Promise<SomeResult> => {
    set(flagIsRaised, true);

    try {
      return await tryToPerformFlaggableProcess();
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
