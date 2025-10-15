import {
  Exit,
} from 'effect';

import {
  Attempt_Error,
} from '../Error';

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
  SomeActionableError extends Attempt_Error.Actionable,
>(
  forciblyGetProduct: () => SomeProduct,
  given: Attempt_Adapted_Config<SomeActionableError>,
): Exit.Exit<SomeProduct, SomeActionableError> => Attempt_Fresh.that(() => safe({
  try() {
    const gottenProduct = forciblyGetProduct();
    return Exit.succeed(gottenProduct);
  },
  catch(someError) {
    const someActionableError = Attempt_Error.Actionable.from(someError, {
      using: given.interpretationOf,
    });

    return Exit.fail(someActionableError);
  },
}));

export {
  Attempt_Adapted_to,
};
