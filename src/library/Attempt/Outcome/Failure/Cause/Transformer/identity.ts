import type {
  Attempt_Error_Actionable,
} from '@/library/Attempt/Error'; // eslint-disable-line import/no-internal-modules -- avoids lengthy relative paths

import type {
  Attempt_Outcome_Failure_Cause_Transformer,
} from './definition.ts';

const Attempt_Outcome_Failure_Cause_Transformer_identity = <
  SomeTransformableActionableError extends Attempt_Error_Actionable<string>,
  SomeTransformedActionableError extends Attempt_Error_Actionable<string>,
>(
  transformableCause: NoInfer<SomeTransformableActionableError>,
): NoInfer<SomeTransformedActionableError> => {
  return transformableCause as unknown as SomeTransformedActionableError;
};

export {
  type Attempt_Outcome_Failure_Cause_Transformer,
  /**/ Attempt_Outcome_Failure_Cause_Transformer_identity,
};
