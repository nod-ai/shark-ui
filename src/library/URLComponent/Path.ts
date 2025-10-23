import {
  Brand,
  Option,
} from 'effect';

type URLComponent_Path = Brand.Branded<
  string,
  'URLComponent_Path'
>;

const URLComponent_Path = Brand.refined<
  URLComponent_Path
>(
  (someString) => Option.gen(function* () {
    const exampleURL = new URL(`https://example.com${someString}`);

    if (
      someString === exampleURL.pathname
    ) return yield* Option.none();

    return Brand.error(`Expected pure path: "${exampleURL.pathname}", got "${someString}"`);
  }),
);

export {
  URLComponent_Path,
};
