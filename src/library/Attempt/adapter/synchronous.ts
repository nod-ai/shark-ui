import Outcome from '../Outcome';

import type {
  ActionableError,
} from '../error';

import {
  outcomeOfFailedAttempt,
} from '../utilities/outcomeOfFailedAttempt';

import {
  sanctioned,
} from '../utilities/sanctionedTryCatch';

const attemptTo = <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  forciblyGetProduct: () => SomeProduct,
): Outcome<SomeProduct, SomeActionableError> => sanctioned({
  try() {
    const gottenProduct = forciblyGetProduct();
    return Outcome.successThatYielded(gottenProduct);
  },
  catch(whateverThatWasThrown) {
    return outcomeOfFailedAttempt<SomeProduct, SomeActionableError>({
      basedOn: whateverThatWasThrown,
    });
  },
});

export {
  attemptTo,
};
