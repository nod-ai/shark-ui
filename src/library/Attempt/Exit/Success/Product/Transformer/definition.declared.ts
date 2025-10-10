import {
  Attempt_Exit_Success_Product_Transformer_identity,
} from './identity';

type Attempt_Exit_Success_Product_Transformer<
  SomeTransformableProduct,
  SomeTransformedProduct,
> = (
  transformableProduct: SomeTransformableProduct,
) => SomeTransformedProduct;

const Attempt_Exit_Success_Product_Transformer = {
  identity: Attempt_Exit_Success_Product_Transformer_identity,
};

export {
  Attempt_Exit_Success_Product_Transformer,
};
