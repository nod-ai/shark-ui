import type {
  Cause,
} from 'effect';

import type {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Exit_Failure,
} from './definition.declared.ts';

const Attempt_Exit_Failure_dueTo = <
  SomeActionableError extends Attempt_Error.Actionable,
>(
  givenCause: Cause.Cause<SomeActionableError>,
): Attempt_Exit_Failure<SomeActionableError> => ({
  discriminant: 'failure',
  cause       : givenCause,
});

export {
  Attempt_Exit_Failure_dueTo,
};
