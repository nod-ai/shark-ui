export const greatestCommonFactor = (a: number, b: number): number => {
  let nextDividend = a;
  let previousRemainder = b;

  while (previousRemainder !== 0) {
    const eachDivisor = previousRemainder;
    previousRemainder = nextDividend % eachDivisor;
    nextDividend = eachDivisor;
  }

  return nextDividend;
};

export const leastCommonMultiple = (a: number, b: number): number => {
  return (a * b) / greatestCommonFactor(a, b);
};

export const cofactor = (
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
