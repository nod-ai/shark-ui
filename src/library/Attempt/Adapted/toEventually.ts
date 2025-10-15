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
  safeAsync,
} from '../tryCatchStatements';

import type {
  Attempt_Adapted_Config,
} from './Config';

const Attempt_Adapted_toEventually = async <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable,
>(
  forciblyRetrieveProduct: () => Promise<SomeProduct>,
  given: Attempt_Adapted_Config<SomeActionableError>,
): Promise<
  Exit.Exit<
    SomeProduct,
    SomeActionableError
  >
> => Attempt_Fresh.thatEventually(() => safeAsync({
  async try() {
    const retrievedProduct: SomeProduct = await forciblyRetrieveProduct();
    return Exit.succeed(retrievedProduct);
  },
  catch(someError) {
    const someActionableError = Attempt_Error.Actionable.from(someError, {
      using: given.interpretationOf,
    });

    return Exit.fail(someActionableError);
  },
}));

export {
  Attempt_Adapted_toEventually,
};
