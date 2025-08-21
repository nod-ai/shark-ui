type Attempt_Outcome_Success_ProductTransformer<
  SomeTransformableProduct,
  SomeTransformedProduct,
> = (
  transformableProduct: SomeTransformableProduct,
) => SomeTransformedProduct;

const Attempt_Outcome_Success_productIdentity = <
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
  product: Attempt_Outcome_Success_ProductTransformer<
    SomeTransformableProduct,
    SomeTransformedProduct
  >;
}

export {
  type Attempt_Outcome_Success_Transformer,
  Attempt_Outcome_Success_productIdentity,
};
