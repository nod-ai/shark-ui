import Attempt from '@/library/Attempt';
import Base64 from '@/library/Base64';
import Byte from '@/library/Byte';
import StringSubset from '@/library/customTypes/StringSubset';

import type {
  StringForciblyParsable,
} from '@/library/typeUtilities/StringForciblyParsable';

import {
  droppingLastCharacter,
  lastCharacterOf,
} from '@/library/utilitiesByType/string.ts';

import Base64CharacterEncodedByteSequence_ParsingError from './ParsingError.ts';

/** See [RFC 4648 Section 4](https://www.rfc-editor.org/rfc/rfc4648.html#section-4) for more information */
class Base64CharacterEncodedByteSequence
  extends StringSubset<
  'Base64CharacterEncodedByteSequence'
> implements StringForciblyParsable<
  typeof Base64CharacterEncodedByteSequence
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

  public static forciblyParsedFrom = (
    givenCharacters: string,
  ): Base64CharacterEncodedByteSequence => {
    const outcomeOfEnsuringEncodableCharacters = Byte.Sequence.ensureEncodable(givenCharacters, {
      assuming: Base64.bitWidth,
    });

    if (outcomeOfEnsuringEncodableCharacters.isFailure) {
      const failureToEnsureEncodableCharacters = outcomeOfEnsuringEncodableCharacters.rewrappedWith({
        cause: $0 => Base64CharacterEncodedByteSequence_ParsingError.thatEscorts($0),
      });

      return failureToEnsureEncodableCharacters.forciblyUnwrap(/* TODO: enable safe error propagation */);
    }

    const paddedByteEncodableCharacters = outcomeOfEnsuringEncodableCharacters.unwrapped;
    const [byteEncodableCharacters, padding] = this.withPaddingDecoupled(paddedByteEncodableCharacters);
    const outcomeOfEnsuringConformantCharacters = Base64.CharacterSequence.ensureConformanceOf(byteEncodableCharacters);

    const outcomeOfParsingByteSequence = Attempt.Outcome.fromRewrapping(outcomeOfEnsuringConformantCharacters, {
      product: $0 => new this($0.concat(padding)),
      cause  : $0 => Base64CharacterEncodedByteSequence_ParsingError.thatEscorts($0),
    });

    return outcomeOfParsingByteSequence.forciblyUnwrap(/* TODO: enable safe error propagation */);
  };
}

export {
  Base64CharacterEncodedByteSequence as default,
  Base64CharacterEncodedByteSequence_ParsingError,
};
