import type {
  Attempt_Outcome,
} from '../Outcome';

import type {
  Attempt_Error_Actionable,
} from '../error';

import {
  assertActionable,
} from '../error/assertions';

import {
  Attempt_thatEventually,
} from '../factory';

import {
  sanctionedAsync,
} from '../utilities/sanctionedTryCatch';

import type Attempt_AdapterConfig from './Config';

const Attempt_toEventually = async <
  SomeProduct,
  SomeActionableError extends Attempt_Error_Actionable<string>,
>(
  forciblyRetrieveProduct: () => Promise<SomeProduct>,
  given: Attempt_AdapterConfig<SomeActionableError>,
): Promise<Attempt_Outcome<SomeProduct, SomeActionableError>> => Attempt_thatEventually(ends => sanctionedAsync({
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

const Attempt_toSettle = async <
  SomeProduct,
  SomeActionableError extends Attempt_Error_Actionable<string>,
>(
  promisedProduct: Promise<SomeProduct>,
  givenConfig: Attempt_AdapterConfig<SomeActionableError>,
): Promise<Attempt_Outcome<SomeProduct, SomeActionableError>> => {
  const getPromisedProduct = () => promisedProduct;
  return Attempt_toEventually(getPromisedProduct, givenConfig);
};

export {
  Attempt_toEventually,
  Attempt_toSettle,
};
