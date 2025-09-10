import type * as Attempt_Outcome_Success_Product from './Product';

interface Attempt_Outcome_Success_Transformer<
  SomeTransformableProduct,
  SomeTransformedProduct,
> {
  product: Attempt_Outcome_Success_Product.Transformer<
    SomeTransformableProduct,
    SomeTransformedProduct
  >;
}

export type {
  Attempt_Outcome_Success_Transformer,
};
