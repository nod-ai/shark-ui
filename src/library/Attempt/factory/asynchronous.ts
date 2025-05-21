import {
  attempt,
} from '../attempt';
import type {
  ActionableError,
} from '../error';

import type {
  Attempt_SynchronousImplementation,
} from './synchronous';

export type Attempt_AsynchronousImplementation<
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
> = (
  ...parameters: Parameters<
    Attempt_SynchronousImplementation<SomeProduct, SomeActionableError>
  >
) => Promise<
  ReturnType<
    Attempt_SynchronousImplementation<SomeProduct, SomeActionableError>
  >
>;

export const Attempt_async = <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  retrieveOutcomeFor: Attempt_AsynchronousImplementation<SomeProduct, SomeActionableError>,
) => retrieveOutcomeFor(attempt);
