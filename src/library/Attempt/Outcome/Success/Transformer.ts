type Attempt_ProductTransformer<
  SomeTransformableProduct,
  SomeTransformedProduct,
> = (
  transformableProduct: SomeTransformableProduct,
) => SomeTransformedProduct;

const Attempt_productIdentity = <
  SomeTransformableProduct,
  SomeTransformedProduct,
>(
  transformableProduct: NoInfer<SomeTransformableProduct>,
): NoInfer<SomeTransformedProduct> => {
  return transformableProduct as unknown as SomeTransformedProduct;
};

interface Attempt_Success_Transformer<
  SomeTransformableProduct,
  SomeTransformedProduct,
> {
  product: Attempt_ProductTransformer<
    SomeTransformableProduct,
    SomeTransformedProduct
  >;
}

export {
  type Attempt_Success_Transformer,
  Attempt_productIdentity,
};
