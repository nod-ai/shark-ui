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
  SomeInferredOutcome extends Attempt_Outcome<unknown, ActionableError<string>>,
> = (
  givenHandles: typeof handles
) => Promise<SomeInferredOutcome>;

const Attempt_thatEventually = async <
  SomeInferredOutcome extends Attempt_Outcome<unknown, ActionableError<string>>,
>(
  endsAccordingTo: Attempt_EndRetriever<SomeInferredOutcome>,
) => {
  type EquivalentOutcome = Attempt_Outcome<ProductOf<SomeInferredOutcome>, CauseOf<SomeInferredOutcome>>;

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
