import {
  Attempt_Error,
} from '../Error';

import {
  Attempt_Fresh,
} from '../Fresh';

import type {
  Attempt_Outcome,
} from '../Outcome';

import {
  safeAsync,
} from '../tryCatchStatements';

import type {
  Attempt_Adapted_Config,
} from './Config';

const Attempt_Adapted_toEventually = async <
  SomeProduct,
  SomeActionableError extends Attempt_Error.Actionable<string>,
>(
  forciblyRetrieveProduct: () => Promise<SomeProduct>,
  given: Attempt_Adapted_Config<SomeActionableError>,
): Promise<
  Attempt_Outcome<
    SomeProduct,
    SomeActionableError
  >
> => Attempt_Fresh.thatEventually(ends => safeAsync({
  async try() {
    const retrievedProduct: SomeProduct = await forciblyRetrieveProduct();
    return ends.inSuccessWith(retrievedProduct);
  },
  catch(someError) {
    const someActionableError = Attempt_Error.Actionable.from(someError, {
      using: given.interpretationOf,
    });

    return ends.inFailureDueTo(someActionableError);
  },
}));

export {
  Attempt_Adapted_toEventually,
};
