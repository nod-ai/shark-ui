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
  TryBlockOutput,
  CatchBlockOutput,
>(
  {
    try: getTryBlockOutput,
    catch: catchBlockOutputFor,
  }: {
    try: () => TryBlockOutput;
    catch: ($0: AppropriatelyThrown<Error>) => CatchBlockOutput;
  },
): TryBlockOutput | CatchBlockOutput => {
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
  TryBlockOutput,
  CatchBlockOutput,
>(
  {
    try: retrieveTryBlockOutput,
    catch: catchBlockOutputFor,
  }: {
    try: () => Promise<TryBlockOutput>;
    catch: ($0: AppropriatelyThrown<Error>) => CatchBlockOutput;
  },
): Promise<TryBlockOutput | CatchBlockOutput> => {
  // eslint-disable-next-line no-restricted-syntax -- this is the implementation designed to help avoid use of raw try/catch
  try {
    return await retrieveTryBlockOutput();
  }
  catch (whateverThatWasThrown) {
    const someError = asError(whateverThatWasThrown);
    const someAppropriatelyThrownError = assertAppropriatelyThrown(someError);
    return catchBlockOutputFor(someAppropriatelyThrownError);
  }
};

export {
  sanctioned,
  sanctionedAsync,
};
