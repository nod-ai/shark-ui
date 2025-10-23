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
  (someString) => Option.gen(function* () {
    const derivedURL = new URL(someString);

    if (
      someString === derivedURL.origin
    ) return yield* Option.none();

    return Brand.error(`Expected pure origin: "${derivedURL.origin}", got "${someString}"`);
  }),
);

export {
  URLComponent_Origin,
};
