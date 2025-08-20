import type {
  Attempt_Outcome,
  CauseOf,
  ProductOf,
} from '../Outcome';

import {
  Attempt_ended as handles,
} from '../ended';

import type {
  Attempt_Error_Actionable,
} from '../error';

import {
  sanctionedAsync,
} from '../utilities/sanctionedTryCatch';

import Attempt_Error_Creation from './AttemptCreationError';

type Attempt_End_Retriever<
  SomeInferredOutcome extends Attempt_Outcome<unknown, Attempt_Error_Actionable<string>>,
> = (
  givenHandles: typeof handles
) => Promise<SomeInferredOutcome>;

const Attempt_thatEventually = async <
  SomeInferredOutcome extends Attempt_Outcome<unknown, Attempt_Error_Actionable<string>>,
>(
  endsAccordingTo: Attempt_End_Retriever<SomeInferredOutcome>,
) => {
  type EquivalentOutcome = Attempt_Outcome<ProductOf<SomeInferredOutcome>, CauseOf<SomeInferredOutcome>>;

  return sanctionedAsync({
    async try() {
      return await endsAccordingTo(handles) as EquivalentOutcome;
    },
    catch(someError) {
      return Attempt_Error_Creation.rethrow(someError);
    },
  });
};

export {
  type Attempt_End_Retriever,
  Attempt_thatEventually,
};
