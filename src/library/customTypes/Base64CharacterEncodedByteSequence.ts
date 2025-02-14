import {
  z,
} from 'zod';

import {
  buildRegExp,
  characterClass,
  characterRange,
  choiceOf,
  digit,
  endOfString,
  optional,
  repeat,
  startOfString,
  zeroOrMore,
} from '@/library/regExpBuilder.ts';
import type {
  Branded,
} from '@/library/typeUtilities/Branded.ts';
import {
  isString,
} from '@/library/utilitiesByType/string.ts';

/** See [RFC 4648 Section 4](https://www.rfc-editor.org/rfc/rfc4648.html#section-4) for more information */
export type Base64CharacterEncodedByteSequence = Branded<string, 'Base64CharacterEncodedByteSequence'>;

const patternForBase64Digit = characterClass(
  characterRange('A', 'Z'),
  characterRange('a', 'z'),
  digit,
  '\\+',
  '\\/',
);

const paddingCharacterForBase64CharacterEncodedByteSequence = '=';

const regExpForBase64CharacterEncodedByteSequence = buildRegExp(
  startOfString,
  zeroOrMore(
    repeat(patternForBase64Digit, 4),
  ),
  optional(
    choiceOf(
      repeat(patternForBase64Digit, 3) + repeat(paddingCharacterForBase64CharacterEncodedByteSequence, 1),
      repeat(patternForBase64Digit, 2) + repeat(paddingCharacterForBase64CharacterEncodedByteSequence, 2),
    ),
  ),
  endOfString,
);

export const isBase64CharacterEncodedByteSequence = (
  givenSubject: unknown,
): givenSubject is Base64CharacterEncodedByteSequence => {
  if (!isString(givenSubject)) return false;

  return regExpForBase64CharacterEncodedByteSequence.test(givenSubject);
};

export const asForcedBase64CharacterEncodedByteSequence = (
  givenSubject: unknown,
): Base64CharacterEncodedByteSequence => {
  if (isBase64CharacterEncodedByteSequence(givenSubject)) return givenSubject;

  throw new TypeError('Failed cast as `Base64CharacterEncodedByteSequence`');
};

export const z_base64CharacterEncodedByteSequence = z.unknown().transform($0 => asForcedBase64CharacterEncodedByteSequence($0));
