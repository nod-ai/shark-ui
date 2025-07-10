const greatestCommonDivisor = (a: number, b: number): number => {
  let nextDividend = a;
  let previousRemainder = b;

  while (previousRemainder !== 0) {
    const eachDivisor = previousRemainder;
    previousRemainder = nextDividend % eachDivisor;
    nextDividend = eachDivisor;
  }

  return nextDividend;
};

const leastCommonMultiple = (a: number, b: number): number => {
  return (a * b) / greatestCommonDivisor(a, b);
};

export {
  greatestCommonDivisor,
  leastCommonMultiple,
};
