import Outcome from '../Outcome';

import type {
  ActionableError,
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

const attemptToEventually = async <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  forciblyRetrieveProduct: () => Promise<SomeProduct>,
): Promise<Outcome<SomeProduct, SomeActionableError>> => Attempt_thatEventually(async ends => sanctionedAsync({
  async try() {
    const retrievedProduct: SomeProduct = await forciblyRetrieveProduct();
    return ends.inSuccessWith(retrievedProduct);
  },
  catch(someError) {
    const someActionableError = assertActionable<SomeActionableError>(someError);
    return ends.inFailureDueTo(someActionableError);
  },
}));

const attemptToSettle = async <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  promisedProduct: Promise<SomeProduct>,
): Promise<Outcome<SomeProduct, SomeActionableError>> => {
  const getPromisedProduct = () => promisedProduct;
  return attemptToEventually(getPromisedProduct);
};

export {
  attemptToEventually,
  attemptToSettle,
};
