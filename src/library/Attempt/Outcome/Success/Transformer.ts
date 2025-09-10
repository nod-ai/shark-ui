import type {
  Transformer as Attempt_Outcome_Success_Product_Transformer,
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

export type {
  Attempt_Outcome_Success_Transformer,
};
