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

const attemptToEventually = async <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  forciblyRetrieveProduct: () => Promise<SomeProduct>,
): Promise<Outcome<SomeProduct, SomeActionableError>> => Attempt_thatEventually(async ends => sanctionedAsync({
  async try() {
    const retrievedProduct: SomeProduct = await forciblyRetrieveProduct();
    return ends.inSuccessWith(retrievedProduct);
  },
  catch(someError) {
    const someActionableError = assertActionable<SomeActionableError>(someError);
    return ends.inFailureDueTo(someActionableError);
  },
}));

const attemptToSettle = async <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  promisedProduct: Promise<SomeProduct>,
  given: {
    interpretationOf: (caughtError: Error) => SomeActionableError | null;
  },
): Promise<Outcome<SomeProduct, SomeActionableError>> => Attempt_thatEventually(ends => sanctionedAsync({
  async try() {
    const getPromisedProduct = () => promisedProduct;
    const intermediateOutcome = await attemptToEventually(getPromisedProduct);

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
      message: 'Failed to settle promise due to an unexpected error',
    });
  },
}));

export {
  attemptToEventually,
  attemptToSettle,
};
