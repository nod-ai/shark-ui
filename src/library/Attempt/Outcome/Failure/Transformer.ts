import type {
  Attempt_Error_Actionable,
} from '../../error';

type Attempt_CauseTransformer<
  SomeTransformableActionableError extends Attempt_Error_Actionable<string>,
  SomeTransformedActionableError extends Attempt_Error_Actionable<string>,
> = (
  transformableCause: SomeTransformableActionableError,
) => SomeTransformedActionableError;

const Attempt_causeIdentity = <
  SomeTransformableActionableError extends Attempt_Error_Actionable<string>,
  SomeTransformedActionableError extends Attempt_Error_Actionable<string>,
>(
  transformableCause: NoInfer<SomeTransformableActionableError>,
): NoInfer<SomeTransformedActionableError> => {
  return transformableCause as unknown as SomeTransformedActionableError;
};

interface Attempt_Failure_Transformer<
  SomeTransformableActionableError extends Attempt_Error_Actionable<string>,
  SomeTransformedActionableError extends Attempt_Error_Actionable<string>,
> {
  cause: Attempt_CauseTransformer<
    SomeTransformableActionableError,
    SomeTransformedActionableError
  >;
}

export {
  type Attempt_Failure_Transformer,
  Attempt_causeIdentity,
};
