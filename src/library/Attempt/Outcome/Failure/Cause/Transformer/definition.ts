import type * as Attempt_Error from '@/library/Attempt/Error'; // eslint-disable-line import/no-internal-modules -- avoids lengthy relative paths

type Attempt_Outcome_Failure_Cause_Transformer<
  SomeTransformableActionableError extends Attempt_Error.Actionable<string>,
  SomeTransformedActionableError extends Attempt_Error.Actionable<string>,
> = (
  transformableCause: SomeTransformableActionableError,
) => SomeTransformedActionableError;

export type {
  Attempt_Outcome_Failure_Cause_Transformer,
};
