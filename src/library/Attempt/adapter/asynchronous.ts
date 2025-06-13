import Outcome from '../Outcome';

import {
  NonActionableError,
  type ActionableError,
} from '../error';
import {
  assertActionable,
} from '../error/assertions';

import {
  Attempt_thatEventually,
} from '../factory';

import {
  sanctionedAsync,
} from '../utilities/sanctionedTryCatch';

import type Attempt_AdapterConfig from './Config';

const attemptToEventually = async <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  forciblyRetrieveProduct: () => Promise<SomeProduct>,
  given: Attempt_AdapterConfig<SomeActionableError>,
): Promise<Outcome<SomeProduct, SomeActionableError>> => Attempt_thatEventually(ends => sanctionedAsync({
  async try() {
    const intermediateOutcome = await sanctionedAsync({
      async try() {
        const retrievedProduct: SomeProduct = await forciblyRetrieveProduct();
        return ends.inSuccessWith(retrievedProduct);
      },
      catch(someError) {
        const someActionableError = assertActionable<SomeActionableError>(someError);
        return ends.inFailureDueTo(someActionableError);
      },
    });

    if (
      intermediateOutcome.isFailure
    ) return intermediateOutcome.causeOfFailure.throwAnyway('Unreachable since `attemptToEventually` still throws everything');

    return intermediateOutcome;
  },
  catch(someError) {
    const interpretedError = given.interpretationOf(someError);

    if (
      interpretedError !== null
    ) return ends.inFailureDueTo(interpretedError);

    return NonActionableError.rethrow(someError, {
      message: 'Failed to end async attempt due to an unexpected error',
    });
  },
}));

const attemptToSettle = async <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  promisedProduct: Promise<SomeProduct>,
  givenConfig: Attempt_AdapterConfig<SomeActionableError>,
): Promise<Outcome<SomeProduct, SomeActionableError>> => {
  const getPromisedProduct = () => promisedProduct;
  return attemptToEventually(getPromisedProduct, givenConfig);
};

export {
  attemptToEventually,
  attemptToSettle,
};
