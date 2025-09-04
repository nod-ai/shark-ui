import type {
  Attempt_Error_Actionable,
} from '../../Error';

type Attempt_Outcome_Failure_Cause_Transformer<
  SomeTransformableActionableError extends Attempt_Error_Actionable<string>,
  SomeTransformedActionableError extends Attempt_Error_Actionable<string>,
> = (
  transformableCause: SomeTransformableActionableError,
) => SomeTransformedActionableError;

const Attempt_Outcome_Failure_Cause_Transformer_identity = <
  SomeTransformableActionableError extends Attempt_Error_Actionable<string>,
  SomeTransformedActionableError extends Attempt_Error_Actionable<string>,
>(
  transformableCause: NoInfer<SomeTransformableActionableError>,
): NoInfer<SomeTransformedActionableError> => {
  return transformableCause as unknown as SomeTransformedActionableError;
};

interface Attempt_Outcome_Failure_Transformer<
  SomeTransformableActionableError extends Attempt_Error_Actionable<string>,
  SomeTransformedActionableError extends Attempt_Error_Actionable<string>,
> {
  cause: Attempt_Outcome_Failure_Cause_Transformer<
    SomeTransformableActionableError,
    SomeTransformedActionableError
  >;
}

export {
  type Attempt_Outcome_Failure_Transformer,
  Attempt_Outcome_Failure_Cause_Transformer_identity,
};
