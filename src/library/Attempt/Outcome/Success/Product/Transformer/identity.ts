const Attempt_Outcome_Success_Product_Transformer_identity = <
  SomeTransformableProduct,
  SomeTransformedProduct,
>(
  transformableProduct: NoInfer<SomeTransformableProduct>,
): NoInfer<SomeTransformedProduct> => {
  return transformableProduct as unknown as SomeTransformedProduct;
};

export {
  Attempt_Outcome_Success_Product_Transformer_identity,
};
