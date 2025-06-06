type Aggregator = (...givenValues: [number, ...number[]]) => number;

const sumOf: Aggregator = (
  ...givenAddends
) => givenAddends.reduce(($0, $1) => $0 + $1);

const arithmeticMeanOf: Aggregator = (
  ...givenValues
) => sumOf(...givenValues) / givenValues.length;

export {
  sumOf,
  arithmeticMeanOf,
};
