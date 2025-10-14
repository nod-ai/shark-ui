const Attempt_Exit_Success_Product_Transformer_identity = <
  SomeTransformableProduct,
  SomeTransformedProduct,
>(
  transformableProduct: NoInfer<SomeTransformableProduct>,
): NoInfer<SomeTransformedProduct> => {
  return transformableProduct as unknown as SomeTransformedProduct;
};

export {
  Attempt_Exit_Success_Product_Transformer_identity,
};
