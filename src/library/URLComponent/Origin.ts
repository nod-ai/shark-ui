import {
  Brand,
  Option,
} from 'effect';

type URLComponent_Origin = Brand.Branded<
  string,
  'URLComponent_Origin'
>;

const URLComponent_Origin = Brand.refined<
  URLComponent_Origin
>(
  (someString) => {
    const derivedURL = new URL(someString);

    if (
      someString === derivedURL.origin
    ) return Option.none();

    const newRefinementError = Brand.error(`Expected pure origin: "${derivedURL.origin}", got "${someString}"`);
    return Option.some(newRefinementError);
  },
);

export {
  URLComponent_Origin,
};
