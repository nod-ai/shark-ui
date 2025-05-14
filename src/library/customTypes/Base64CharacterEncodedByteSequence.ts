import * as Byte from '@/library/Byte';

import type {
  StaticStringParser,
} from '@/library/typeUtilities/StaticStringParser.ts';

import {
  droppingLastCharacter,
  lastCharacterOf,
} from '@/library/utilitiesByType/string.ts';

import StringSubset from './StringSubset.ts';

const Base64 = {
  Character: {
    count: 64 as const,
  },
  get bitCount(): number {
    return Math.log2(this.Character.count);
  },
};

/** See [RFC 4648 Section 4](https://www.rfc-editor.org/rfc/rfc4648.html#section-4) for more information */
export default class Base64CharacterEncodedByteSequence
  extends StringSubset<'Base64CharacterEncodedByteSequence'>
  implements StaticStringParser<typeof Base64CharacterEncodedByteSequence> {
  public static paddingCharacter = '=';

  private static readonly byteCofactor = Byte.cofactorTo(Base64.bitCount);

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

  private static assertConsistsOfBase64Alphabet(givenCharacters: string): string {
    const regExForBase64Alphabet = /^[A-Za-z\d\+\/]+$/;

    if (regExForBase64Alphabet.test(givenCharacters)) return givenCharacters;

    throw new TypeError(`Characters contained 1+ characters outside of the Base64 Alphabet: ${regExForBase64Alphabet.toString()}`);
  }

  public static forciblyParsedFrom(
    givenCharacters: string,
  ): Base64CharacterEncodedByteSequence {
    const paddedByteEncodableCharacters = Byte.Sequence.assertEncodable(givenCharacters, {
      assuming: Base64.bitCount,
    });

    const [byteEncodableCharacters, padding] = this.withPaddingDecoupled(paddedByteEncodableCharacters);
    const base64ByteEncodableCharacters = this.assertConsistsOfBase64Alphabet(byteEncodableCharacters);
    const base64CharacterEncodedByteSequence = base64ByteEncodableCharacters + padding;
    return new this(base64CharacterEncodedByteSequence);
  }
}
