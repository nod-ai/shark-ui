import * as Attempt_Error from '../Error';
import * as Attempt_Fresh from '../Fresh';

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
  SomeActionableError extends Attempt_Error.Actionable<string>,
>(
  forciblyGetProduct: () => SomeProduct,
  given: Attempt_Adapted_Config<SomeActionableError>,
): Attempt_Outcome<SomeProduct, SomeActionableError> => Attempt_Fresh.that(ends => safe({
  try() {
    const gottenProduct = forciblyGetProduct();
    return ends.inSuccessWith(gottenProduct);
  },
  catch(someError) {
    const someActionableError = Attempt_Error.Actionable_from(someError, {
      using: given.interpretationOf,
    });

    return ends.inFailureDueTo(someActionableError);
  },
}));

export {
  Attempt_Adapted_to,
};
