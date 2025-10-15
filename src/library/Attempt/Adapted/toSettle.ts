import type {
  Exit,
} from 'effect';

import type {
  Attempt_Error,
} from '../Error';

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
  Exit.Exit<
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
