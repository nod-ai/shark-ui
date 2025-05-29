import Outcome from '../Outcome';

import type {
  ActionableError,
} from '../error';
import {
  assertActionable,
} from '../error/assertions';

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
  catch(someError) {
    const someActionableError = assertActionable<SomeActionableError>(someError);
    return Outcome.failureDueTo(someActionableError);
  },
});

export {
  attemptTo,
};
