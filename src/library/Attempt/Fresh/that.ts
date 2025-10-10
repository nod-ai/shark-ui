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
  SomeInferredOutcome extends Attempt_Exit<unknown, Attempt_Error.Actionable<string>>,
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  SomeEquivalentOutcome extends Attempt_Exit<
    ProductOf<SomeInferredOutcome>,
    CauseOf<SomeInferredOutcome>
  > = Attempt_Exit<
    ProductOf<SomeInferredOutcome>,
    CauseOf<SomeInferredOutcome>
  >,
>(
  getEnd: Attempt_End.Getter<SomeInferredOutcome>,
): SomeEquivalentOutcome => {
  return safe({
    try() {
      return getEnd() as unknown as SomeEquivalentOutcome;
    },
    catch(someError) {
      return Attempt_Error.Creation.rethrow(someError);
    },
  });
};

export {
  Attempt_Fresh_that,
};
