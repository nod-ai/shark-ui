import type {
  CauseOf,
  ProductOf,
} from '../Outcome';

import type Outcome from '../Outcome';

import {
  Attempt_ended as handles,
} from '../ended';
import {
  ActionableError,
} from '../error';

export const Attempt_that = <
  InferredOutcome extends Outcome<unknown, ActionableError<string>>,
>(
  endsAccordingTo: (givenHandles: typeof handles) => InferredOutcome,
) => {
  type EquivalentOutcome = Outcome<ProductOf<InferredOutcome>, CauseOf<InferredOutcome>>;
  return endsAccordingTo(handles) as EquivalentOutcome;
};
