import {
  type Actionable as Attempt_Error_Actionable,
  Actionable_from as Attempt_Error_Actionable_from,
} from '../Error';

import {
  that as Attempt_Fresh_that,
} from '../Fresh';

import type {
  Attempt_Outcome,
} from '../Outcome';

import {
  safe,
} from '../tryCatchStatements';

import type {
  Attempt_Adapted_Config,
} from './Config';

const Attempt_Adapted_to = <
  SomeProduct,
  SomeActionableError extends Attempt_Error_Actionable<string>,
>(
  forciblyGetProduct: () => SomeProduct,
  given: Attempt_Adapted_Config<SomeActionableError>,
): Attempt_Outcome<SomeProduct, SomeActionableError> => Attempt_Fresh_that(ends => safe({
  try() {
    const gottenProduct = forciblyGetProduct();
    return ends.inSuccessWith(gottenProduct);
  },
  catch(someError) {
    const someActionableError = Attempt_Error_Actionable_from(someError, {
      using: given.interpretationOf,
    });

    return ends.inFailureDueTo(someActionableError);
  },
}));

export {
  Attempt_Adapted_to,
};
