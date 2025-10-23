import {
  Brand,
  Option,
  Encoding,
} from 'effect';

/** See [RFC 4648 Section 4](https://www.rfc-editor.org/rfc/rfc4648.html#section-4) for more information */
type Sequence_Byte_Encoded_Base64 = Brand.Branded<
  string,
  'Sequence_Byte_Encoded_Base64'
>;

const Sequence_Byte_Encoded_Base64 = Brand.refined<
  Sequence_Byte_Encoded_Base64
>(
  (someString) => Option.gen(function* () {
    const resultOfDecodingByteSequence = Encoding.decodeBase64(someString);
    const parsingError = yield* Option.getLeft(resultOfDecodingByteSequence);

    const refinementError = Brand.error('String is not valid Base64-encoded byte sequence', {
      cause: parsingError,
    });

    return refinementError;
  }),
);

export {
  Sequence_Byte_Encoded_Base64,
};
