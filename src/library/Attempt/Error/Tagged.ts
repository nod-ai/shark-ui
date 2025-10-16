import {
  Data,
} from 'effect';

const Attempt_Error_Tagged = <
  SomeBrand extends string,
>(
  givenBrand: SomeBrand,
) => { // eslint-disable-line @typescript-eslint/explicit-function-return-type
  return Data.TaggedError(givenBrand)<{
    message: string;
    cause?: Error;
  }>;
};

export {
  Attempt_Error_Tagged,
};
