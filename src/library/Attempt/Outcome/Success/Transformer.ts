type ProductTransformer<
  TransformableProduct,
  TransformedProduct,
> = (
  transformableProduct: TransformableProduct,
) => TransformedProduct;

const productIdentity = <
  TransformableProduct,
  TransformedProduct,
>(
  transformableProduct: NoInfer<TransformableProduct>,
): NoInfer<TransformedProduct> => {
  return transformableProduct as unknown as TransformedProduct;
};

interface Attempt_Success_Transformer<
  TransformableProduct,
  TransformedProduct,
> {
  product: ProductTransformer<
    TransformableProduct,
    TransformedProduct
  >;
}

export {
  type Attempt_Success_Transformer,
  productIdentity,
};
