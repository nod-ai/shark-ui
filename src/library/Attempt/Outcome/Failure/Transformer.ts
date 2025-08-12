import type {
  ActionableError,
} from '../../error';

type CauseTransformer<
  SomeTransformableActionableError extends ActionableError<string>,
  SomeTransformedActionableError extends ActionableError<string>,
> = (
  transformableCause: SomeTransformableActionableError,
) => SomeTransformedActionableError;

const causeIdentity = <
  SomeTransformableActionableError extends ActionableError<string>,
  SomeTransformedActionableError extends ActionableError<string>,
>(
  transformableCause: NoInfer<SomeTransformableActionableError>,
): NoInfer<SomeTransformedActionableError> => {
  return transformableCause as unknown as SomeTransformedActionableError;
};

interface Attempt_Failure_Transformer<
  SomeTransformableActionableError extends ActionableError<string>,
  SomeTransformedActionableError extends ActionableError<string>,
> {
  cause: CauseTransformer<
    SomeTransformableActionableError,
    SomeTransformedActionableError
  >;
}

export {
  type Attempt_Failure_Transformer,
  causeIdentity,
};
