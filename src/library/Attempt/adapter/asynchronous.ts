import Outcome from '../Outcome';

import type {
  ActionableError,
} from '../error';

import {
  outcomeOfFailedAttempt,
} from '../utilities/outcomeOfFailedAttempt';

export const attemptToEventually = async <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  forciblyRetrieveProduct: () => Promise<SomeProduct>,
): Promise<Outcome<SomeProduct, SomeActionableError>> => {
  // eslint-disable-next-line no-restricted-syntax
  try {
    const retrievedProduct: SomeProduct = await forciblyRetrieveProduct();
    return Outcome.successThatYielded(retrievedProduct);
  }
  catch (whateverThatWasThrown) {
    return outcomeOfFailedAttempt<SomeProduct, SomeActionableError>({
      basedOn: whateverThatWasThrown,
    });
  }
};

export const attemptToSettle = async <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  promisedProduct: Promise<SomeProduct>,
): Promise<Outcome<SomeProduct, SomeActionableError>> => {
  const getPromisedProduct = () => promisedProduct;
  return attemptToEventually(getPromisedProduct);
};
