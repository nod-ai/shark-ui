import type * as Attempt_Error from '@/library/Attempt/Error'; // eslint-disable-line import/no-internal-modules -- avoids lengthy relative paths

const Attempt_Outcome_Failure_Cause_Transformer_identity = <
  SomeTransformableActionableError extends Attempt_Error.Actionable<string>,
  SomeTransformedActionableError extends Attempt_Error.Actionable<string>,
>(
  transformableCause: NoInfer<SomeTransformableActionableError>,
): NoInfer<SomeTransformedActionableError> => {
  return transformableCause as unknown as SomeTransformedActionableError;
};

export {
  Attempt_Outcome_Failure_Cause_Transformer_identity,
};
