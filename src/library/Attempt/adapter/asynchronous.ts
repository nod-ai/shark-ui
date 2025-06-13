import Outcome from '../Outcome';

import {
  NonActionableError,
  type ActionableError,
} from '../error';

import type {
  PotentiallyActionable,
} from '../error/modifier';

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
    return await sanctionedAsync({
      async try() {
        const retrievedProduct: SomeProduct = await forciblyRetrieveProduct();
        return ends.inSuccessWith(retrievedProduct);
      },
      catch(someError) {
        if (
          someError instanceof NonActionableError
        ) return someError.throw();

        throw someError; // eslint-disable-line no-restricted-syntax
      },
    });
  },
  catch(someError) {
    const someActionableError = (() => {
      const potentiallyActionableError = ((givenError): PotentiallyActionable<typeof someError> => {
        if (
          !(givenError instanceof NonActionableError)
        ) return givenError;

        return givenError.rethrownError ?? givenError.throw();
      })(someError);

      const interpretedError = given.interpretationOf(potentiallyActionableError);

      if (
        interpretedError !== null
      ) return interpretedError;

      return NonActionableError.rethrow(potentiallyActionableError, {
        message: 'Failed to end async attempt due to an unexpected error',
      });
    })();

    return ends.inFailureDueTo(someActionableError);
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
