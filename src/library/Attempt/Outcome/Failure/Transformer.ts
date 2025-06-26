import type {
  ActionableError,
} from '../../error';

type CauseTransformer<
  TransformableActionableError extends ActionableError<string>,
  TransformedActionableError extends ActionableError<string>,
> = (
  transformableCause: TransformableActionableError,
) => TransformedActionableError;

const causeIdentity = <
  TransformableActionableError extends ActionableError<string>,
  TransformedActionableError extends ActionableError<string>,
>(
  transformableCause: NoInfer<TransformableActionableError>,
): NoInfer<TransformedActionableError> => {
  return transformableCause as unknown as TransformedActionableError;
};

interface Attempt_Failure_Transformer<
  TransformableActionableError extends ActionableError<string>,
  TransformedActionableError extends ActionableError<string>,
> {
  cause: CauseTransformer<
    TransformableActionableError,
    TransformedActionableError
  >;
}

export {
  type Attempt_Failure_Transformer,
  causeIdentity,
};
