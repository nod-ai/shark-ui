import Attempt from '@/library/Attempt';
import Base64 from '@/library/Base64';
import Byte from '@/library/Byte';
import type Parsable from '@/library/Parsable';
import Schema from '@/library/Schema';
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
  default as Sequence_Byte_Encoded_Base64_ParsingError,
} from './ParsingError.ts';

/** See [RFC 4648 Section 4](https://www.rfc-editor.org/rfc/rfc4648.html#section-4) for more information */
class Sequence_Byte_Encoded_Base64
  extends StringSubset<
    'Sequence_Byte_Encoded_Base64'
  > implements Parsable.String<
    typeof Sequence_Byte_Encoded_Base64,
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
    Sequence_Byte_Encoded_Base64,
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

  /** An alternative to `Schema.base64()` that avoids using the deprecated `atob` conversion under the hood */
  public static Schema = Schema.string().transform((someSubject, currentContext) => {
    const outcomeOfParsingSubject = this.parsedFrom(someSubject);

    if (
      outcomeOfParsingSubject.isSuccess
    ) return outcomeOfParsingSubject.unwrapped;

    currentContext.addIssue({
      code   : 'custom',
      message: outcomeOfParsingSubject.cause.message,
    });

    return Schema.NEVER;
  });
}

export {
  Sequence_Byte_Encoded_Base64,
};
