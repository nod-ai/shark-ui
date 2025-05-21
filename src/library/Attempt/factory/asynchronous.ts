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

export const Attempt_thatEventually = async <
  InferredOutcome extends Outcome<unknown, ActionableError<string>>,
>(
  endsAccordingTo: (givenHandles: typeof handles) => Promise<InferredOutcome>,
) => {
  type EquivalentOutcome = Outcome<ProductOf<InferredOutcome>, CauseOf<InferredOutcome>>;
  return await endsAccordingTo(handles) as EquivalentOutcome;
};
