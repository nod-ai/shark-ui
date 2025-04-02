type Aggregator = (...givenValues: [number, ...number[]]) => number;

export const sumOf: Aggregator = (
  ...givenAddends
) => givenAddends.reduce(($0, $1) => $0 + $1);

export const arithmeticMeanOf: Aggregator = (
  ...givenValues
) => sumOf(...givenValues) / givenValues.length;
