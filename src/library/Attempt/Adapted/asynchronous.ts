import {
  type Attempt_Error_Actionable,
  assertActionable,
} from '../Error';

import type {
  Attempt_Outcome,
} from '../Outcome';

import {
  Attempt_Fresh_thatEventually,
} from '../factory';

import {
  safeAsync,
} from '../utilities/safeTryCatch';

import type Attempt_Adapted_Config from './Config';

const Attempt_Adapted_toEventually = async <
  SomeProduct,
  SomeActionableError extends Attempt_Error_Actionable<string>,
>(
  forciblyRetrieveProduct: () => Promise<SomeProduct>,
  given: Attempt_Adapted_Config<SomeActionableError>,
): Promise<
  Attempt_Outcome<
    SomeProduct,
    SomeActionableError
  >
> => Attempt_Fresh_thatEventually(ends => safeAsync({
  async try() {
    const retrievedProduct: SomeProduct = await forciblyRetrieveProduct();
    return ends.inSuccessWith(retrievedProduct);
  },
  catch(someError) {
    const someActionableError = assertActionable(someError, {
      using: given.interpretationOf,
    });

    return ends.inFailureDueTo(someActionableError);
  },
}));

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
  Attempt_Adapted_toEventually,
  Attempt_Adapted_toSettle,
};
