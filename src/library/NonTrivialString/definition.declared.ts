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
  (someString) => Option.gen(function* () {
    const resultOfDecodingTrivialString = Schema.decodeEither(Schema.NonEmptyTrimmedString)(someString);
    const parsingError = yield* Option.getLeft(resultOfDecodingTrivialString);

    const refinementError = Brand.error(`Expected string to contain something beyond just whitespace, got "${someString}"`, {
      cause: parsingError,
    });

    return refinementError;
  }),
);

export {
  NonTrivialString,
};
