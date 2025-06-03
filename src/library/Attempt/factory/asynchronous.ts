import type {
  CauseOf,
  ProductOf,
} from '../Outcome';

import type Outcome from '../Outcome';

import {
  Attempt_ended as handles,
} from '../ended';

import type {
  ActionableError,
} from '../error';

export type Attempt_EndRetriever<
  InferredOutcome extends Outcome<unknown, ActionableError<string>>,
> = (
  givenHandles: typeof handles
) => Promise<InferredOutcome>;

export const Attempt_thatEventually = async <
  InferredOutcome extends Outcome<unknown, ActionableError<string>>,
>(
  endsAccordingTo: Attempt_EndRetriever<InferredOutcome>,
) => {
  type EquivalentOutcome = Outcome<ProductOf<InferredOutcome>, CauseOf<InferredOutcome>>;
  return await endsAccordingTo(handles) as EquivalentOutcome;
};
