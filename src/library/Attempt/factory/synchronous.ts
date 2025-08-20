import type {
  Attempt_Outcome,
  CauseOf,
  ProductOf,
} from '../Outcome';

import {
  Attempt_ended as handles,
} from '../ended';

import type {
  Attempt_ActionableError,
} from '../error';

import {
  sanctioned,
} from '../utilities/sanctionedTryCatch';

import Attempt_CreationError from './AttemptCreationError';

type Attempt_EndGetter<
  SomeInferredOutcome extends Attempt_Outcome<unknown, Attempt_ActionableError<string>>,
> = (
  givenHandles: typeof handles
) => SomeInferredOutcome;

const Attempt_that = <
  SomeInferredOutcome extends Attempt_Outcome<unknown, Attempt_ActionableError<string>>,
>(
  endsAccordingTo: Attempt_EndGetter<SomeInferredOutcome>,
) => {
  type EquivalentOutcome = Attempt_Outcome<ProductOf<SomeInferredOutcome>, CauseOf<SomeInferredOutcome>>;

  return sanctioned({
    try() {
      return endsAccordingTo(handles) as EquivalentOutcome;
    },
    catch(someError) {
      return Attempt_CreationError.rethrow(someError);
    },
  });
};

export {
  type Attempt_EndGetter,
  Attempt_that,
};
