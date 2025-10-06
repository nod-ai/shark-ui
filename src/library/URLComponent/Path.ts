import {
  Brand,
  Option,
} from 'effect';

/** See [RFC 4648 Section 4](https://www.rfc-editor.org/rfc/rfc4648.html#section-4) for more information */
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
