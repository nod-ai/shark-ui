type Attempt_Outcome_Success_Product_Transformer<
  SomeTransformableProduct,
  SomeTransformedProduct,
> = (
  transformableProduct: SomeTransformableProduct,
) => SomeTransformedProduct;

export type {
  Attempt_Outcome_Success_Product_Transformer,
};
