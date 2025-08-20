import type {
  Attempt_Outcome,
} from '../Outcome';

import type {
  Attempt_ActionableError,
} from '../error';

import {
  assertActionable,
} from '../error/assertions';

import {
  Attempt_that,
} from '../factory';

import {
  sanctioned,
} from '../utilities/sanctionedTryCatch';

import type Attempt_AdapterConfig from './Config';

const Attempt_to = <
  SomeProduct,
  SomeActionableError extends Attempt_ActionableError<string>,
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
  Attempt_to,
};
