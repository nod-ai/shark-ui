import {
  Attempt_Outcome_Success_Product_Transformer_identity,
} from './identity';

type Attempt_Outcome_Success_Product_Transformer<
  SomeTransformableProduct,
  SomeTransformedProduct,
> = (
  transformableProduct: SomeTransformableProduct,
) => SomeTransformedProduct;

const Attempt_Outcome_Success_Product_Transformer = {
  identity: Attempt_Outcome_Success_Product_Transformer_identity,
};

export {
  Attempt_Outcome_Success_Product_Transformer,
};
