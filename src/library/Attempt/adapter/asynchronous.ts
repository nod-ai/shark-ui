import Outcome from '../Outcome';

import type {
  ActionableError,
} from '../error';
import {
  assertActionable,
} from '../error/assertions';

import {
  sanctionedAsync,
} from '../utilities/sanctionedTryCatch';

const attemptToEventually = async <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  forciblyRetrieveProduct: () => Promise<SomeProduct>,
): Promise<Outcome<SomeProduct, SomeActionableError>> => sanctionedAsync({
  async try() {
    const retrievedProduct: SomeProduct = await forciblyRetrieveProduct();
    return Outcome.successThatYielded(retrievedProduct);
  },
  catch(someError) {
    const someActionableError = assertActionable<SomeActionableError>(someError);
    return Outcome.failureDueTo(someActionableError);
  },
});

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
