import Attempt from '@/library/Attempt';
import Base64 from '@/library/Base64';
import Byte from '@/library/Byte';
import type Parsable from '@/library/Parsable';
import Sequence from '@/library/Sequence';
import StringSubset from '@/library/StringSubset';

import {
  droppingLastCharacter,
  lastCharacterOf,
} from '@/library/utilitiesByType/string.ts';

import Base64CharacterEncodedByteSequence_ParsingError from './ParsingError.ts';

/** See [RFC 4648 Section 4](https://www.rfc-editor.org/rfc/rfc4648.html#section-4) for more information */
class Base64CharacterEncodedByteSequence
  extends StringSubset<
  'Base64CharacterEncodedByteSequence'
> implements Parsable.String<
  typeof Base64CharacterEncodedByteSequence,
  /*  */ Base64CharacterEncodedByteSequence_ParsingError
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
  ): Attempt.Outcome<Base64CharacterEncodedByteSequence, Base64CharacterEncodedByteSequence_ParsingError> => {
    const outcomeOfEnsuringEncodableCharacters = Sequence.Byte.ensureEncodable(givenCharacters, {
      assuming: Base64.bitWidth,
    });

    if (outcomeOfEnsuringEncodableCharacters.isFailure) {
      const failureToEnsureEncodableCharacters = outcomeOfEnsuringEncodableCharacters.rewrappedWith({
        cause: $0 => Base64CharacterEncodedByteSequence_ParsingError.thatEscorts($0),
      });

      return failureToEnsureEncodableCharacters;
    }

    const paddedByteEncodableCharacters = outcomeOfEnsuringEncodableCharacters.unwrapped;
    const [byteEncodableCharacters, padding] = this.withPaddingDecoupled(paddedByteEncodableCharacters);
    const outcomeOfEnsuringConformantCharacters = Sequence.Base64.ensureConformanceOf(byteEncodableCharacters);

    const outcomeOfParsingByteSequence = Attempt.Outcome.fromRewrapping(outcomeOfEnsuringConformantCharacters, {
      product: $0 => new this($0.concat(padding)),
      cause  : $0 => Base64CharacterEncodedByteSequence_ParsingError.thatEscorts($0),
    });

    return outcomeOfParsingByteSequence;
  };
}

export {
  Base64CharacterEncodedByteSequence,
};
