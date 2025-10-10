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
  getOrElse    : () => givenProduct,
  getOrThrow   : () => givenProduct,
  value        : givenProduct,
  rewrappedWith: <
    SomeTransformedProduct,
  >(
    transformed = Attempt_Outcome_Success_Product.Transformer.identity<
      SomeProduct,
      SomeTransformedProduct
    >,
  ) => {
    const transformedProduct = transformed(givenProduct);
    const transformedSuccess = Attempt_Outcome_Success_thatYielded(transformedProduct);
    return transformedSuccess;
  },
});

export {
  Attempt_Outcome_Success_thatYielded,
};
