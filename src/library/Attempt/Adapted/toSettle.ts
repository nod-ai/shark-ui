import type {
  Attempt_Error,
} from '../Error';

import type {
  Attempt_Exit,
} from '../Exit';

import type {
  Attempt_Adapted_Config,
} from './Config';

import {
  Attempt_Adapted_toEventually,
} from './toEventually';

const Attempt_Adapted_toSettle = async <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable,
>(
  promisedProduct: Promise<SomeProduct>,
  givenConfig: Attempt_Adapted_Config<SomeActionableError>,
): Promise<
  Attempt_Exit.Exit<
    SomeProduct,
    SomeActionableError
  >
> => {
  const getPromisedProduct = (): Promise<SomeProduct> => promisedProduct;
  return Attempt_Adapted_toEventually(getPromisedProduct, givenConfig);
};

export {
  Attempt_Adapted_toSettle,
};
