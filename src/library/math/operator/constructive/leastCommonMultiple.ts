import {
  greatestCommonDivisor,
} from './greatestCommonDivisor/abbreviations/gcf';

const leastCommonMultiple = (
  a: number,
  b: number,
): number => {
  return (a * b) / greatestCommonDivisor(a, b);
};

export {
  leastCommonMultiple,
};
