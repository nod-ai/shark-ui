import type {
  Attempt_Error_Actionable,
} from '../Error';

import Attempt_Error_Creation from '../Error/Creation';

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
} from '../utilities/safeTryCatch';

type Attempt_End_Getter<
  SomeInferredOutcome extends Attempt_Outcome<unknown, Attempt_Error_Actionable<string>>,
> = (
  givenHandles: typeof handles
) => SomeInferredOutcome;

const Attempt_that = <
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
  type Attempt_End_Getter,
  Attempt_that,
};
