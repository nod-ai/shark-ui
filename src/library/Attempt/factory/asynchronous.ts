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
  sanctionedAsync,
} from '../utilities/sanctionedTryCatch';

import Attempt_CreationError from './AttemptCreationError';

type Attempt_EndRetriever<
  SomeInferredOutcome extends Attempt_Outcome<unknown, Attempt_ActionableError<string>>,
> = (
  givenHandles: typeof handles
) => Promise<SomeInferredOutcome>;

const Attempt_thatEventually = async <
  SomeInferredOutcome extends Attempt_Outcome<unknown, Attempt_ActionableError<string>>,
>(
  endsAccordingTo: Attempt_EndRetriever<SomeInferredOutcome>,
) => {
  type EquivalentOutcome = Attempt_Outcome<ProductOf<SomeInferredOutcome>, CauseOf<SomeInferredOutcome>>;

  return sanctionedAsync({
    async try() {
      return await endsAccordingTo(handles) as EquivalentOutcome;
    },
    catch(someError) {
      return Attempt_CreationError.rethrow(someError);
    },
  });
};

export {
  type Attempt_EndRetriever,
  Attempt_thatEventually,
};
