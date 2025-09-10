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
  safeAsync,
} from '../tryCatchStatements';

const Attempt_Fresh_thatEventually = async <
  SomeInferredOutcome extends Attempt_Outcome<unknown, Attempt_Error.Actionable<string>>,
>(
  endsAccordingTo: Attempt_End.Retriever<SomeInferredOutcome>,
) => {
  type EquivalentOutcome = Attempt_Outcome<
    ProductOf<SomeInferredOutcome>,
    CauseOf<SomeInferredOutcome>
  >;

  return safeAsync({
    async try() {
      return await endsAccordingTo(handles) as EquivalentOutcome;
    },
    catch(someError) {
      return Attempt_Error.Creation.rethrow(someError);
    },
  });
};

export {
  Attempt_Fresh_thatEventually,
};
