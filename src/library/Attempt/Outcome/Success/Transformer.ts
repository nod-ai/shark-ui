import {
  type Attempt_Outcome_Success_Product_Transformer,
  Attempt_Outcome_Success_Product_Transformer_identity,
} from './Product';

interface Attempt_Outcome_Success_Transformer<
  SomeTransformableProduct,
  SomeTransformedProduct,
> {
  product: Attempt_Outcome_Success_Product_Transformer<
    SomeTransformableProduct,
    SomeTransformedProduct
  >;
}

export {
  type Attempt_Outcome_Success_Transformer,
  Attempt_Outcome_Success_Product_Transformer_identity,
};
