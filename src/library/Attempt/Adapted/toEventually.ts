import {
  type Attempt_Error_Actionable,
  Attempt_Error_Actionable_from,
} from '../Error';

import {
  Attempt_Fresh_thatEventually,
} from '../Fresh';

import type {
  Attempt_Outcome,
} from '../Outcome';

import {
  safeAsync,
} from '../tryCatchStatements';

import type {
  default as Attempt_Adapted_Config,
} from './Config';

const Attempt_Adapted_toEventually = async <
  SomeProduct,
  SomeActionableError extends Attempt_Error_Actionable<string>,
>(
  forciblyRetrieveProduct: () => Promise<SomeProduct>,
  given: Attempt_Adapted_Config<SomeActionableError>,
): Promise<
  Attempt_Outcome<
    SomeProduct,
    SomeActionableError
  >
> => Attempt_Fresh_thatEventually(ends => safeAsync({
  async try() {
    const retrievedProduct: SomeProduct = await forciblyRetrieveProduct();
    return ends.inSuccessWith(retrievedProduct);
  },
  catch(someError) {
    const someActionableError = Attempt_Error_Actionable_from(someError, {
      using: given.interpretationOf,
    });

    return ends.inFailureDueTo(someActionableError);
  },
}));

export {
  Attempt_Adapted_toEventually,
};
