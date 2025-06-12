import Outcome from '../Outcome';

import type {
  ActionableError,
} from '../error';

import {
  outcomeOfFailedAttempt,
} from '../utilities/outcomeOfFailedAttempt';

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
    return outcomeOfFailedAttempt<SomeProduct, SomeActionableError>({
      basedOn: someError,
    });
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
