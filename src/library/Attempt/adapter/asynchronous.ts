import type {
  Attempt_Outcome,
} from '../Outcome';

import {
  assertActionable,
} from '../error/assertions';

import type {
  ActionableError,
} from '../error/exports';

import {
  Attempt_thatEventually,
} from '../factory';

import {
  sanctionedAsync,
} from '../utilities/sanctionedTryCatch';

import type Attempt_AdapterConfig from './Config';

const attemptToEventually = async <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
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

const attemptToSettle = async <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  promisedProduct: Promise<SomeProduct>,
  givenConfig: Attempt_AdapterConfig<SomeActionableError>,
): Promise<Attempt_Outcome<SomeProduct, SomeActionableError>> => {
  const getPromisedProduct = () => promisedProduct;
  return attemptToEventually(getPromisedProduct, givenConfig);
};

export {
  attemptToEventually,
  attemptToSettle,
};
