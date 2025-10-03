import {
  Either,
  Schema,
} from 'effect';

import Attempt from '@/library/Attempt';
import type Parsable from '@/library/Parsable';
import StringSubset from '@/library/StringSubset';

import {
  Sequence_Byte_Encoded_Base64,
} from '../Base64';

import {
  Sequence_Byte_Encoded_Base64_ParsingError,
} from './ParsingError';

/** See [RFC 4648 Section 4](https://www.rfc-editor.org/rfc/rfc4648.html#section-4) for more information */
class Sequence_Byte_Encoded_Base64_dep
  extends StringSubset<
    'Sequence_Byte_Encoded_Base64'
  >
  implements Parsable.String<
    typeof Sequence_Byte_Encoded_Base64_dep,
    /*  */ Sequence_Byte_Encoded_Base64_ParsingError
  > {
  public static parsedFrom = (
    givenCharacters: string,
  ): Attempt.Outcome<
    Sequence_Byte_Encoded_Base64_dep,
    Sequence_Byte_Encoded_Base64_ParsingError
  > => Attempt.Fresh.that((ends) => {
    const resultOfParsingByteSequence = Schema.decodeEither(
      Schema.String.pipe(Schema.fromBrand(Sequence_Byte_Encoded_Base64)),
    )(givenCharacters);

    if (
      Either.isRight(resultOfParsingByteSequence)
    ) return ends.inSuccessWith(new this(resultOfParsingByteSequence.right));

    const caughtError = resultOfParsingByteSequence.left;
    const newParsingError = new Sequence_Byte_Encoded_Base64_ParsingError(caughtError._tag);
    return ends.inFailureDueTo(newParsingError);
  });
}

export {
  Sequence_Byte_Encoded_Base64_dep,
};
