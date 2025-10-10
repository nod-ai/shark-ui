import type {
  Attempt_Error,
} from '../../Error';

import type {
  Attempt_Outcome_Failure,
} from './definition.declared.ts';

const Attempt_Outcome_Failure_dueTo = <
  SomeActionableError extends Attempt_Error.Actionable<string>,
>(
  givenCause: SomeActionableError,
): Attempt_Outcome_Failure<SomeActionableError> => ({
  discriminant: 'failure',
  cause       : givenCause,
  isSuccess   : false,
  isFailure   : true,
});

export {
  Attempt_Outcome_Failure_dueTo,
};
