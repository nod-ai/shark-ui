import {
  leastCommonMultiple,
} from './leastCommonMultiple';

const cofactor = (
  {
    to: givenCofactor,
    forLCMWith: givenValue,
  }: {
    to: number;
    forLCMWith: number;
  },
): number => {
  return leastCommonMultiple(givenValue, givenCofactor) / givenCofactor;
};

export {
  cofactor,
};
