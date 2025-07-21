import type {
  Attempt_Outcome,
  CauseOf,
  ProductOf,
} from '../Outcome';

import {
  Attempt_ended as handles,
} from '../ended';

import type {
  ActionableError,
} from '../error';

import {
  sanctionedAsync,
} from '../utilities/sanctionedTryCatch';

import AttemptCreationError from './AttemptCreationError';

type Attempt_EndRetriever<
  InferredOutcome extends Attempt_Outcome<unknown, ActionableError<string>>,
> = (
  givenHandles: typeof handles
) => Promise<InferredOutcome>;

const Attempt_thatEventually = async <
  InferredOutcome extends Attempt_Outcome<unknown, ActionableError<string>>,
>(
  endsAccordingTo: Attempt_EndRetriever<InferredOutcome>,
) => {
  type EquivalentOutcome = Attempt_Outcome<ProductOf<InferredOutcome>, CauseOf<InferredOutcome>>;

  return sanctionedAsync({
    async try() {
      return await endsAccordingTo(handles) as EquivalentOutcome;
    },
    catch(someError) {
      return AttemptCreationError.rethrow(someError);
    },
  });
};

export {
  type Attempt_EndRetriever,
  Attempt_thatEventually,
};
