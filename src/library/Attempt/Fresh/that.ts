import type {
  Attempt_End_Getter,
} from '../End';

import {
  type Actionable as Attempt_Error_Actionable,
  Creation as Attempt_Error_Creation,
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
  SomeInferredOutcome extends Attempt_Outcome<unknown, Attempt_Error_Actionable<string>>,
>(
  endsAccordingTo: Attempt_End_Getter<SomeInferredOutcome>,
) => {
  type EquivalentOutcome = Attempt_Outcome<
    ProductOf<SomeInferredOutcome>,
    CauseOf<SomeInferredOutcome>
  >;

  return safe({
    try() {
      return endsAccordingTo(handles) as EquivalentOutcome;
    },
    catch(someError) {
      return Attempt_Error_Creation.rethrow(someError);
    },
  });
};

export {
  Attempt_Fresh_that,
};
