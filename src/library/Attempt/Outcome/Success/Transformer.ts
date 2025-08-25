type Attempt_Outcome_Success_Product_Transformer<
  SomeTransformableProduct,
  SomeTransformedProduct,
> = (
  transformableProduct: SomeTransformableProduct,
) => SomeTransformedProduct;

const Attempt_Outcome_Success_Product_identity = <
  SomeTransformableProduct,
  SomeTransformedProduct,
>(
  transformableProduct: NoInfer<SomeTransformableProduct>,
): NoInfer<SomeTransformedProduct> => {
  return transformableProduct as unknown as SomeTransformedProduct;
};

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
  Attempt_Outcome_Success_Product_identity,
};
