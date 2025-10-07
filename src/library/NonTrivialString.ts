import {
  Brand,
  Option,
  Schema,
} from 'effect';

type NonTrivialString = Brand.Branded<
  string,
  'NonTrivialString'
>;

const NonTrivialString = Brand.refined<
  NonTrivialString
>(
  (someString) => {
    const resultOfDecodingTrivialString = Schema.decodeEither(Schema.NonEmptyTrimmedString)(someString);
    const potentialParsingError = Option.getLeft(resultOfDecodingTrivialString);

    const potentialRefinementError = Option.map(
      potentialParsingError,
      $0 => Brand.error(`Expected string to contain something beyond just whitespace, got "${someString}"`, {
        cause: $0,
      }),
    );

    return potentialRefinementError;
  },
);

export {
  NonTrivialString as default,
};
