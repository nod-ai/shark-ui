import {
  asError,
} from '@/library/utilitiesByType/error';

import {
  assertAppropriatelyThrown,
} from '../Error/assertions';

import type {
  AppropriatelyThrown,
} from '../Error/modifier';

const safe = <
  SomeTryBlockOutput,
  SomeCatchBlockOutput,
>(
  {
    try: getTryBlockOutput,
    catch: catchBlockOutputFor,
  }: {
    try: () => SomeTryBlockOutput;
    catch: ($0: AppropriatelyThrown<Error>) => SomeCatchBlockOutput;
  },
): SomeTryBlockOutput | SomeCatchBlockOutput => {
  // eslint-disable-next-line no-restricted-syntax -- this is the implementation designed to help avoid use of raw try/catch
  try {
    return getTryBlockOutput();
  }
  catch (whateverThatWasThrown) {
    const someError = asError(whateverThatWasThrown);
    const someAppropriatelyThrownError = assertAppropriatelyThrown(someError);
    return catchBlockOutputFor(someAppropriatelyThrownError);
  }
};

const safeAsync = async <
  SomeOutputOfResolvedPromise,
  SomeOutputOfRejectedPromise,
>(
  {
    try: retrieveTryBlockOutput,
    catch: catchBlockOutputFor,
  }: {
    try: () => Promise<SomeOutputOfResolvedPromise>;
    catch: ($0: AppropriatelyThrown<Error>) => SomeOutputOfRejectedPromise;
  },
): Promise<
  SomeOutputOfResolvedPromise | SomeOutputOfRejectedPromise
> => {
  const safelyCatch = (whateverThatWasThrown: unknown) => safe({
    try: () => {
      throw whateverThatWasThrown; // eslint-disable-line no-restricted-syntax -- puts the error back through the safe catch
    },
    catch: catchBlockOutputFor,
  });

  return retrieveTryBlockOutput().catch(safelyCatch);
};

export {
  safe,
  safeAsync,
};
