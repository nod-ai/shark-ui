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
  (someString) => {
    const resultOfDecodingByteSequence = Encoding.decodeBase64(someString);
    const potentialParsingError = Option.getLeft(resultOfDecodingByteSequence);

    const potentialRefinementError = Option.map(
      potentialParsingError,
      ($0) => Brand.error('String is not valid Base64-encoded byte sequence', {
        cause: $0,
      }),
    );

    return potentialRefinementError;
  },
);

export {
  Sequence_Byte_Encoded_Base64,
};
