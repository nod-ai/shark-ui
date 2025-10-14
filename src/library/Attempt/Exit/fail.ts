import {
  Cause,
} from 'effect';

import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit_Failure,
} from './Failure';

import {
  Attempt_Exit_failCause,
} from './failCause';

const Attempt_Exit_fail = <
  SomeActionableError extends Attempt_Error.Actionable<string>,
>(
  givenError: SomeActionableError,
): Attempt_Exit_Failure<SomeActionableError> => Attempt_Exit_failCause(
  Cause.fail(givenError),
);

export {
  Attempt_Exit_fail,
};
