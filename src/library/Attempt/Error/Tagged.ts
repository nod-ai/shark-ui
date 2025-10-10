import {
  Attempt_Error_Actionable,
} from './Actionable';

const Attempt_Error_Tagged = <
  SomeBrand extends string,
>(
  givenBrand: SomeBrand,
) => { // eslint-disable-line @typescript-eslint/explicit-function-return-type
  return class extends Attempt_Error_Actionable<SomeBrand> {
    public override readonly name = givenBrand;
  };
};

export {
  Attempt_Error_Tagged,
};
