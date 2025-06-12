import {
  asError,
} from '@/library/utilitiesByType/error';

const sanctioned = <
  TryBlockOutput,
  CatchBlockOutput,
>(
  {
    try: getTryBlockOutput,
    catch: catchBlockOutputFor,
  }: {
    try: () => TryBlockOutput;
    catch: ($0: Error) => CatchBlockOutput;
  },
): TryBlockOutput | CatchBlockOutput => {
  // eslint-disable-next-line no-restricted-syntax -- this is the implementation designed to help avoid use of raw try/catch
  try {
    return getTryBlockOutput();
  }
  catch (whateverThatWasThrown) {
    const someError = asError(whateverThatWasThrown);
    return catchBlockOutputFor(someError);
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
    catch: ($0: Error) => CatchBlockOutput;
  },
): Promise<TryBlockOutput | CatchBlockOutput> => {
  // eslint-disable-next-line no-restricted-syntax -- this is the implementation designed to help avoid use of raw try/catch
  try {
    return await retrieveTryBlockOutput();
  }
  catch (whateverThatWasThrown) {
    const someError = asError(whateverThatWasThrown);
    return catchBlockOutputFor(someError);
  }
};

export {
  sanctioned,
  sanctionedAsync,
};
