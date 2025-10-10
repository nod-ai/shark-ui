import {
  Attempt_Error,
} from '../Error';

import {
  Attempt_Outcome,
} from '../Exit';

import {
  Attempt_Fresh,
} from '../Fresh';

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
): Attempt_Outcome<SomeProduct, SomeActionableError> => Attempt_Fresh.that(() => safe({
  try() {
    const gottenProduct = forciblyGetProduct();
    return Attempt_Outcome.succeed(gottenProduct);
  },
  catch(someError) {
    const someActionableError = Attempt_Error.Actionable.from(someError, {
      using: given.interpretationOf,
    });

    return Attempt_Outcome.failCause(someActionableError);
  },
}));

export {
  Attempt_Adapted_to,
};
