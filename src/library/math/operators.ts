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

export {
  greatestCommonDivisor,
};
