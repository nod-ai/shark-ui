import {
  Either,
  ParseResult,
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

  public static Schema = Schema.transformOrFail(
    Schema.String,
    Schema.instanceOf(Sequence_Byte_Encoded_Base64_dep),
    {
      strict: true,
      decode: (input, options, ast) => {
        const outcomeOfParsingInput = this.parsedFrom(input);

        if (
          outcomeOfParsingInput.isSuccess
        ) return ParseResult.succeed(outcomeOfParsingInput.unwrapped);

        const newParsingIssue = new ParseResult.Type(
          ast,
          input,
          outcomeOfParsingInput.cause.message,
        );

        return ParseResult.fail(newParsingIssue);
      },
      encode: $0 => ParseResult.succeed($0.toString()),
    },
  );
}

export {
  Sequence_Byte_Encoded_Base64_dep,
};
