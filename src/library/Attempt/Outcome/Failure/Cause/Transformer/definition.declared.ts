import type {
  Attempt_Error,
} from '@/library/Attempt/Error'; // eslint-disable-line import/no-internal-modules -- avoids lengthy relative paths

import {
  Attempt_Outcome_Failure_Cause_Transformer_identity,
} from './identity';

type Attempt_Outcome_Failure_Cause_Transformer<
  SomeTransformableActionableError extends Attempt_Error.Actionable<string>,
  SomeTransformedActionableError extends Attempt_Error.Actionable<string>,
> = (
  transformableCause: SomeTransformableActionableError,
) => SomeTransformedActionableError;

const Attempt_Outcome_Failure_Cause_Transformer = {
  identity: Attempt_Outcome_Failure_Cause_Transformer_identity,
};

export {
  Attempt_Outcome_Failure_Cause_Transformer,
};
