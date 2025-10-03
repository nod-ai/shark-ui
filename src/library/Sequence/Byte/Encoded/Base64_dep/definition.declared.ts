import {
  ParseResult,
  Schema,
} from 'effect';

import Attempt from '@/library/Attempt';
import Base64 from '@/library/Base64';
import Byte from '@/library/Byte';
import type Parsable from '@/library/Parsable';
import StringSubset from '@/library/StringSubset';

import {
  droppingLastCharacter,
  lastCharacterOf,
} from '@/library/utilitiesByType/string';

import {
  Sequence_Base64,
} from '../../../Base64';

import {
  Sequence_Byte_Encoded_Compatibility,
} from '../Compatibility';

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
  public static paddingCharacter = '=';

  private static readonly byteCofactor = Byte.cofactorTo(Base64.bitWidth);

  private static readonly minNumberOf6BitSegments = 2; // lowest number of 6-bit segments (12 bits) to exceed an 8-bit segment
  private static readonly maxNumberOfPaddingCharacters = this.byteCofactor - this.minNumberOf6BitSegments;

  private static withPaddingDecoupled(givenSequence: string): [string, string] {
    let remainingSequence = givenSequence;
    let accumulatedPadding = '';

    while (
      (lastCharacterOf(remainingSequence) === this.paddingCharacter)
      && accumulatedPadding.length <= this.maxNumberOfPaddingCharacters
    ) {
      remainingSequence = droppingLastCharacter(remainingSequence);
      accumulatedPadding += this.paddingCharacter;
    }

    return [remainingSequence, accumulatedPadding];
  }

  public static parsedFrom = (
    givenCharacters: string,
  ): Attempt.Outcome<
    Sequence_Byte_Encoded_Base64_dep,
    Sequence_Byte_Encoded_Base64_ParsingError
  > => {
    const outcomeOfEnsuringEncodableCharacters = Sequence_Byte_Encoded_Compatibility.ensure(givenCharacters, {
      assuming: Base64.bitWidth,
    });

    if (outcomeOfEnsuringEncodableCharacters.isFailure) {
      const failureToEnsureEncodableCharacters = outcomeOfEnsuringEncodableCharacters.rewrappedWith({
        cause: $0 => Sequence_Byte_Encoded_Base64_ParsingError.thatEscorts($0),
      });

      return failureToEnsureEncodableCharacters;
    }

    const paddedByteEncodableCharacters = outcomeOfEnsuringEncodableCharacters.unwrapped;
    const [byteEncodableCharacters, padding] = this.withPaddingDecoupled(paddedByteEncodableCharacters);
    const outcomeOfEnsuringConformantCharacters = Sequence_Base64.Conformance.ensure(byteEncodableCharacters);

    const outcomeOfParsingByteSequence = Attempt.Outcome.fromRewrapping(outcomeOfEnsuringConformantCharacters, {
      product: $0 => new this($0.concat(padding)),
      cause  : $0 => Sequence_Byte_Encoded_Base64_ParsingError.thatEscorts($0),
    });

    return outcomeOfParsingByteSequence;
  };

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
