type Aggregator = (...givenValues: [number, ...number[]]) => number;

const sumOf: Aggregator = (
  ...givenAddends
) => givenAddends.reduce(($0, $1) => $0 + $1);

export {
  type Aggregator,
  sumOf,
};
