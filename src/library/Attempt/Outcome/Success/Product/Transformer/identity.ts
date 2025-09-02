type Attempt_Outcome_Success_Product_Transformer<
  SomeTransformableProduct,
  SomeTransformedProduct,
> = (
  transformableProduct: SomeTransformableProduct,
) => SomeTransformedProduct;

const Attempt_Outcome_Success_Product_Transformer_identity = <
  SomeTransformableProduct,
  SomeTransformedProduct,
>(
  transformableProduct: NoInfer<SomeTransformableProduct>,
): NoInfer<SomeTransformedProduct> => {
  return transformableProduct as unknown as SomeTransformedProduct;
};

export {
  type Attempt_Outcome_Success_Product_Transformer,
  /**/ Attempt_Outcome_Success_Product_Transformer_identity,
};
