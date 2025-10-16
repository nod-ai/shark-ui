import {
  Data,
} from 'effect';

const Attempt_Error_Tagged = <
  SomeBrand extends string,
>(
  givenBrand: SomeBrand,
) => { // eslint-disable-line @typescript-eslint/explicit-function-return-type
  return class extends Data.Error<{
    message: string;
    cause?: Error;
  }> {
    public override readonly name = givenBrand;
  };
};

export {
  Attempt_Error_Tagged,
};
