import type {
  Aggregator,
} from './Aggregator';

const sumOf: Aggregator = (
  ...givenAddends
) => givenAddends.reduce(($0, $1) => $0 + $1);

export {
  sumOf,
};
