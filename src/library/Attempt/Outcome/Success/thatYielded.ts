import {
  Attempt_Outcome_Success_Product,
} from './Product';

import type {
  Attempt_Outcome_Success,
} from './definition.declared.ts';

const Attempt_Outcome_Success_thatYielded = <
  SomeProduct,
>(
  givenProduct: SomeProduct,
): Attempt_Outcome_Success<SomeProduct> => ({
  discriminant : 'success',
  product      : givenProduct,
  isSuccess    : true,
  isFailure    : false,
  unwrapOr     : () => givenProduct,
  unwrapOrNull : () => givenProduct,
  unwrapOrThrow: () => givenProduct,
  unwrapped    : givenProduct,
  rewrappedWith: <
    SomeTransformedProduct,
  >(
    {
      product: transformed,
    } = {
      product: Attempt_Outcome_Success_Product.Transformer.identity<
        SomeProduct,
        SomeTransformedProduct
      >,
    },
  ) => {
    const transformedProduct = transformed(givenProduct);
    const transformedSuccess = Attempt_Outcome_Success_thatYielded(transformedProduct);
    return transformedSuccess;
  },
});

export {
  Attempt_Outcome_Success_thatYielded,
};
