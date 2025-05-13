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
  SomeActionableError extends ActionableError<string>,
>(
  {
    basedOn: givenSubject,
  }: {
    basedOn: unknown;
  },
): Outcome<SomeProduct, SomeActionableError> => {
  const someError = asError(givenSubject);
  const potentiallyActionableError = assertPotentiallyActionable(someError);
  const safelyPropagatedError = assertSafelyPropagated(potentiallyActionableError);
  return NonActionableError.rethrow(safelyPropagatedError);
};

const attemptTo = <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  getProductFromSomeProcessThatCanThrow: () => SomeProduct,
): Outcome<SomeProduct, SomeActionableError> => {
  // eslint-disable-next-line no-restricted-syntax
  try {
    const productFromSomeProcessThatDidNotThrow = getProductFromSomeProcessThatCanThrow();
    return Outcome.successThatYielded(productFromSomeProcessThatDidNotThrow);
  }
  catch (whateverThatWasThrown) {
    return outcomeOfFailedAttempt<SomeProduct, SomeActionableError>({
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
  SomeActionableError extends ActionableError<string>,
>(
  getProductFromSomeAsyncProcessThatCanThrow: () => Promise<SomeProduct>,
): Promise<Outcome<SomeProduct, SomeActionableError>> => {
  // eslint-disable-next-line no-restricted-syntax
  try {
    const productFromSomeSuccessfulAsyncProcess: SomeProduct = await getProductFromSomeAsyncProcessThatCanThrow();
    return Outcome.successThatYielded(productFromSomeSuccessfulAsyncProcess);
  }
  catch (whateverThatWasThrown) {
    return outcomeOfFailedAttempt<SomeProduct, SomeActionableError>({
      basedOn: whateverThatWasThrown,
    });
  }
};

const attemptToSettle = async <
  SomeProduct,
  SomeActionableError extends ActionableError<string>,
>(
  promisedProduct: Promise<SomeProduct>,
): Promise<Outcome<SomeProduct, SomeActionableError>> => {
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
