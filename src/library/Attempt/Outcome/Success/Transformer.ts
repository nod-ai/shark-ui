type ProductTransformer<
  SomeTransformableProduct,
  SomeTransformedProduct,
> = (
  transformableProduct: SomeTransformableProduct,
) => SomeTransformedProduct;

const productIdentity = <
  TransformableProduct,
  TransformedProduct,
>(
  transformableProduct: NoInfer<TransformableProduct>,
): NoInfer<TransformedProduct> => {
  return transformableProduct as unknown as TransformedProduct;
};

interface Attempt_Success_Transformer<
  SomeTransformableProduct,
  SomeTransformedProduct,
> {
  product: ProductTransformer<
    SomeTransformableProduct,
    SomeTransformedProduct
  >;
}

export {
  type Attempt_Success_Transformer,
  productIdentity,
};
