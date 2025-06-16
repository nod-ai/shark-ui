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

type Attempt_EndGetter<
  InferredOutcome extends Outcome<unknown, ActionableError<string>>,
> = (
  givenHandles: typeof handles
) => InferredOutcome;

const Attempt_that = <
  InferredOutcome extends Outcome<unknown, ActionableError<string>>,
>(
  endsAccordingTo: Attempt_EndGetter<InferredOutcome>,
) => {
  type EquivalentOutcome = Outcome<ProductOf<InferredOutcome>, CauseOf<InferredOutcome>>;
  return endsAccordingTo(handles) as EquivalentOutcome;
};

export {
  type Attempt_EndGetter,
  Attempt_that,
};
