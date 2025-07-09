import {
  greatestCommonDivisor,
} from './greatestCommonDivisor';

const leastCommonMultiple = (
  a: number,
  b: number,
): number => {
  return (a * b) / greatestCommonDivisor(a, b);
};

export {
  leastCommonMultiple,
};
