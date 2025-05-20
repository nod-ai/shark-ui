import Outcome from '../Outcome';

import type {
  ActionableError,
} from '../error';

import {
  outcomeOfFailedAttempt,
} from '../utilities/outcomeOfFailedAttempt';

export const attemptTo = <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  forciblyGetProduct: () => SomeProduct,
): Outcome<SomeProduct, SomeActionableError> => {
  // eslint-disable-next-line no-restricted-syntax
  try {
    const gottenProduct = forciblyGetProduct();
    return Outcome.successThatYielded(gottenProduct);
  }
  catch (whateverThatWasThrown) {
    return outcomeOfFailedAttempt<SomeProduct, SomeActionableError>({
      basedOn: whateverThatWasThrown,
    });
  }
};
