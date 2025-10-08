import type {
  AppropriatelyThrown,
} from '../Error';

import {
  safe,
} from './safe';

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
  const safelyCatch = (whateverThatWasThrown: unknown): SomeOutputOfRejectedPromise => safe({
    try: () => {
      throw whateverThatWasThrown; // eslint-disable-line no-restricted-syntax -- puts the error back through the safe catch
    },
    catch: catchBlockOutputFor,
  });

  return retrieveTryBlockOutput().catch(safelyCatch);
};

export {
  safeAsync,
};
