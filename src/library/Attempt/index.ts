import {
  asError,
} from '@/library/utilitiesByType/error';

import Outcome from './Outcome';

import {
  NonActionableError,
  ActionableError,
} from './error';

import {
  assertPotentiallyActionable,
  assertSafelyPropagated,
} from './error/modifier';

const outcomeOfFailedAttempt = <
  SomeProduct,
>(
  {
    basedOn: givenSubject,
  }: {
    basedOn: unknown;
  },
): Outcome<SomeProduct> => {
  const someError = asError(givenSubject);
  const potentiallyActionableError = assertPotentiallyActionable(someError);
  const safelyPropagatedError = assertSafelyPropagated(potentiallyActionableError);
  return NonActionableError.rethrow(safelyPropagatedError);
};

const attemptTo = <
  SomeProduct,
>(
  getProductFromSomeProcessThatCanThrow: () => SomeProduct,
): Outcome<SomeProduct> => {
  // eslint-disable-next-line no-restricted-syntax
  try {
    const productFromSomeProcessThatDidNotThrow = getProductFromSomeProcessThatCanThrow();
    return Outcome.successThatYielded(productFromSomeProcessThatDidNotThrow);
  }
  catch (whateverThatWasThrown) {
    return outcomeOfFailedAttempt<SomeProduct>({
      basedOn: whateverThatWasThrown,
    });
  }
};

const attemptToOpaquely = <
  SomeProduct,
>(
  getProductFromSomeProcessThatCanThrow: () => SomeProduct,
): SomeProduct | null => {
  const outcomeOfProcess = attemptTo(getProductFromSomeProcessThatCanThrow);

  if (
    outcomeOfProcess.isFailure
  ) return null;

  return outcomeOfProcess.productOfSuccess;
};

const attemptToEventually = async <
  SomeProduct,
>(
  getProductFromSomeAsyncProcessThatCanThrow: () => Promise<SomeProduct>,
): Promise<Outcome<SomeProduct>> => {
  // eslint-disable-next-line no-restricted-syntax
  try {
    const productFromSomeSuccessfulAsyncProcess: SomeProduct = await getProductFromSomeAsyncProcessThatCanThrow();
    return Outcome.successThatYielded(productFromSomeSuccessfulAsyncProcess);
  }
  catch (whateverThatWasThrown) {
    return outcomeOfFailedAttempt<SomeProduct>({
      basedOn: whateverThatWasThrown,
    });
  }
};

const attemptToSettle = async <
  SomeProduct,
>(
  promisedProduct: Promise<SomeProduct>,
): Promise<Outcome<SomeProduct>> => {
  const getPromisedProduct = () => promisedProduct;
  return attemptToEventually(getPromisedProduct);
};

const Attempt = {
  to          : attemptTo,
  toOpaquely  : attemptToOpaquely,
  toEventually: attemptToEventually,
  toSettle    : attemptToSettle,
};

export default Attempt;

export {
  NonActionableError,
  ActionableError,
  Outcome,
};
