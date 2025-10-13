import {
  asError,
} from '@/library/utilitiesByType/error';

import {
  AppropriatelyThrown,
} from '../Error';

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
    const someAppropriatelyThrownError = AppropriatelyThrown.assume(someError);
    return catchBlockOutputFor(someAppropriatelyThrownError);
  }
};

export {
  safe,
};
