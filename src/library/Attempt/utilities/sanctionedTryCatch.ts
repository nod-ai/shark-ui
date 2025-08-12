import {
  asError,
} from '@/library/utilitiesByType/error';

import {
  assertAppropriatelyThrown,
} from '../error/assertions';

import type {
  AppropriatelyThrown,
} from '../error/modifier';

const sanctioned = <
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

const sanctionedAsync = async <
  OutputOfResolvedPromise,
  OutputOfRejectedPromise,
>(
  {
    try: retrieveTryBlockOutput,
    catch: catchBlockOutputFor,
  }: {
    try: () => Promise<OutputOfResolvedPromise>;
    catch: ($0: AppropriatelyThrown<Error>) => OutputOfRejectedPromise;
  },
): Promise<OutputOfResolvedPromise | OutputOfRejectedPromise> => {
  const sanction = (whateverThatWasThrown: unknown) => sanctioned({
    try: () => {
      throw whateverThatWasThrown; // eslint-disable-line no-restricted-syntax -- puts the error back through the sanctioned catch
    },
    catch: catchBlockOutputFor,
  });

  return retrieveTryBlockOutput().catch(sanction);
};

export {
  sanctioned,
  sanctionedAsync,
};
