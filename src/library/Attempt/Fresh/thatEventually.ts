import type {
  Attempt_End,
} from '../End';

import {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit,
  CauseOf,
  ProductOf,
} from '../Exit';

import {
  safeAsync,
} from '../tryCatchStatements';

const Attempt_Fresh_thatEventually = async <
  SomeInferredExit extends Attempt_Exit.Exit<unknown, Attempt_Error.Actionable<string>>,
  SomeEquivalentExit extends Attempt_Exit.Exit<
    ProductOf<SomeInferredExit>,
    CauseOf<SomeInferredExit>
  > = Attempt_Exit.Exit<
    ProductOf<SomeInferredExit>,
    CauseOf<SomeInferredExit>
  >,
>(
  retrieveEnd: Attempt_End.Retriever<SomeInferredExit>,
): Promise<SomeEquivalentExit> => {
  return safeAsync({
    async try() {
      return await retrieveEnd() as unknown as SomeEquivalentExit;
    },
    catch(someError) {
      return Attempt_Error.Creation.rethrow(someError);
    },
  });
};

export {
  Attempt_Fresh_thatEventually,
};
