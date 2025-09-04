import type {
  Attempt_Error_Actionable,
} from '../Error';

import type {
  Attempt_Outcome,
} from '../Outcome';

import type Attempt_Adapted_Config from './Config';

import {
  Attempt_Adapted_toEventually,
} from './toEventually';

const Attempt_Adapted_toSettle = async <
  SomeProduct,
  SomeActionableError extends Attempt_Error_Actionable<string>,
>(
  promisedProduct: Promise<SomeProduct>,
  givenConfig: Attempt_Adapted_Config<SomeActionableError>,
): Promise<
  Attempt_Outcome<
    SomeProduct,
    SomeActionableError
  >
> => {
  const getPromisedProduct = () => promisedProduct;
  return Attempt_Adapted_toEventually(getPromisedProduct, givenConfig);
};

export {
  Attempt_Adapted_toSettle,
};
