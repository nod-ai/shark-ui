import Outcome from '../Outcome';

import {
  attempt,
} from '../attempt';

import {
  ActionableError,
} from '../error';

export type Attempt_SynchronousImplementation<
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
> = (
  given: typeof attempt,
) => Outcome<SomeProduct, SomeActionableError>;

export const Attempt_sync = <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  getOutcomeFor: Attempt_SynchronousImplementation<SomeProduct, SomeActionableError>,
) => getOutcomeFor(attempt);
