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
  (someString) => {
    const exampleURL = new URL(`https://example.com${someString}`);

    if (
      someString === exampleURL.pathname
    ) return Option.none();

    const newBrandError = Brand.error(`Expected pure path: "${exampleURL.pathname}", got "${someString}"`);
    return Option.some(newBrandError);
  },
);

export {
  URLComponent_Path,
};
