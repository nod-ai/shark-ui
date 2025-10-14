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
  safe,
} from '../tryCatchStatements';

const Attempt_Fresh_that = <
  SomeInferredExit extends Attempt_Exit.Exit<unknown, Attempt_Error.Actionable>,
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  SomeEquivalentExit extends Attempt_Exit.Exit<
    ProductOf<SomeInferredExit>,
    CauseOf<SomeInferredExit>
  > = Attempt_Exit.Exit<
    ProductOf<SomeInferredExit>,
    CauseOf<SomeInferredExit>
  >,
>(
  getEnd: Attempt_End.Getter<SomeInferredExit>,
): SomeEquivalentExit => {
  return safe({
    try() {
      return getEnd() as unknown as SomeEquivalentExit;
    },
    catch(someError) {
      return Attempt_Error.Creation.rethrow(someError);
    },
  });
};

export {
  Attempt_Fresh_that,
};
