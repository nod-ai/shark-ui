import type {
  Attempt_End,
} from '../End';

import {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Outcome,
  CauseOf,
  ProductOf,
} from '../Outcome';

import {
  Attempt_ended as handles,
} from '../ended';

import {
  safe,
} from '../tryCatchStatements';

const Attempt_Fresh_that = <
  SomeInferredOutcome extends Attempt_Outcome<unknown, Attempt_Error.Actionable<string>>,
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
  SomeEquivalentOutcome extends Attempt_Outcome<
    ProductOf<SomeInferredOutcome>,
    CauseOf<SomeInferredOutcome>
  > = Attempt_Outcome<
    ProductOf<SomeInferredOutcome>,
    CauseOf<SomeInferredOutcome>
  >,
>(
  endsAccordingTo: Attempt_End.Getter<SomeInferredOutcome>,
): SomeEquivalentOutcome => {
  return safe({
    try() {
      return endsAccordingTo(handles) as unknown as SomeEquivalentOutcome;
    },
    catch(someError) {
      return Attempt_Error.Creation.rethrow(someError);
    },
  });
};

export {
  Attempt_Fresh_that,
};
