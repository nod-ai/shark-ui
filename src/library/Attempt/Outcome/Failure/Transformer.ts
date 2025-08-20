import type {
  Attempt_ActionableError,
} from '../../error';

type Attempt_CauseTransformer<
  SomeTransformableActionableError extends Attempt_ActionableError<string>,
  SomeTransformedActionableError extends Attempt_ActionableError<string>,
> = (
  transformableCause: SomeTransformableActionableError,
) => SomeTransformedActionableError;

const Attempt_causeIdentity = <
  SomeTransformableActionableError extends Attempt_ActionableError<string>,
  SomeTransformedActionableError extends Attempt_ActionableError<string>,
>(
  transformableCause: NoInfer<SomeTransformableActionableError>,
): NoInfer<SomeTransformedActionableError> => {
  return transformableCause as unknown as SomeTransformedActionableError;
};

interface Attempt_Failure_Transformer<
  SomeTransformableActionableError extends Attempt_ActionableError<string>,
  SomeTransformedActionableError extends Attempt_ActionableError<string>,
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
