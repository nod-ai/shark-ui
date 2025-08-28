import {
  type Attempt_Error_Actionable,
  assertActionable,
} from '../Error';

import type {
  Attempt_Outcome,
} from '../Outcome';

import {
  Attempt_that,
} from '../factory';

import {
  safe,
} from '../utilities/safeTryCatch';

import type Attempt_Adapted_Config from './Config';

const Attempt_Adapted_to = <
  SomeProduct,
  SomeActionableError extends Attempt_Error_Actionable<string>,
>(
  forciblyGetProduct: () => SomeProduct,
  given: Attempt_Adapted_Config<SomeActionableError>,
): Attempt_Outcome<SomeProduct, SomeActionableError> => Attempt_that(ends => safe({
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
  Attempt_Adapted_to,
};
