const greatestCommonDivisor = (
  leftHandOperand: number,
  rightHandOperand: number,
): number => {
  let nextDividend = leftHandOperand;
  let previousRemainder = rightHandOperand;

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
