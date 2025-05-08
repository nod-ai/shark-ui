import {
  asError,
} from '@/library/utilitiesByType/error';

import Outcome, {
  Failure,
  Success,
} from './Outcome';

const attemptTo = <
  SomeProduct,
>(
  getProductFromSomeProcessThatCanThrow: () => SomeProduct,
): Outcome<SomeProduct> => {
  try {
    const productFromSomeProcessThatDidNotThrow = getProductFromSomeProcessThatCanThrow();
    return Success.thatYielded(productFromSomeProcessThatDidNotThrow);
  }
  catch (someException) {
    const someError = asError(someException);
    return Failure.dueTo(someError);
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
  try {
    const productFromSomeSuccessfulAsyncProcess: SomeProduct = await getProductFromSomeAsyncProcessThatCanThrow();
    return Success.thatYielded(productFromSomeSuccessfulAsyncProcess);
  }
  catch (someException) {
    const someError = asError(someException);
    return Failure.dueTo(someError);
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
