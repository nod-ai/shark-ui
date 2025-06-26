import Attempt from '@/library/Attempt';
import * as Base64 from '@/library/Base64';
import * as Byte from '@/library/Byte';
import StringSubset from '@/library/customTypes/StringSubset';

import type {
  StringForciblyParsable,
} from '@/library/typeUtilities/StringForciblyParsable';

import {
  droppingLastCharacter,
  lastCharacterOf,
} from '@/library/utilitiesByType/string.ts';

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
    const paddedByteEncodableCharacters = Byte.Sequence.ensureEncodable(givenCharacters, {
      assuming: Base64.bitWidth,
    }).forciblyUnwrap(/* TODO: make adjacent to `return` statement */);

    const [byteEncodableCharacters, padding] = this.withPaddingDecoupled(paddedByteEncodableCharacters);
    const outcomeOfEnsuringConformantCharacters = Base64.CharacterSequence.ensureConformanceOf(byteEncodableCharacters);

    const outcomeOfParsingByteSequence = Attempt.Outcome.fromRewrapping(outcomeOfEnsuringConformantCharacters, {
      product: $0 => new this($0 + padding),
    });

    return outcomeOfParsingByteSequence.forciblyUnwrap();
  };
}

export {
  Base64CharacterEncodedByteSequence as default,
};
