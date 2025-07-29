import type {
  Attempt_Outcome,
} from '../Outcome';

import {
  assertActionable,
} from '../error/assertions/exports';

import type {
  ActionableError,
} from '../error/exports';

import {
  Attempt_that,
} from '../factory/exports';

import {
  sanctioned,
} from '../utilities/sanctionedTryCatch';

import type Attempt_AdapterConfig from './Config';

const attemptTo = <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  forciblyGetProduct: () => SomeProduct,
  given: Attempt_AdapterConfig<SomeActionableError>,
): Attempt_Outcome<SomeProduct, SomeActionableError> => Attempt_that(ends => sanctioned({
  try() {
    const gottenProduct = forciblyGetProduct();
    return ends.inSuccessWith(gottenProduct);
  },
  catch(someError) {
    const someActionableError = assertActionable(someError, {
      using: given.interpretationOf,
    });

    return ends.inFailureDueTo(someActionableError);
  },
}));

export {
  attemptTo,
};
