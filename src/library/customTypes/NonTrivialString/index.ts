import type {
  StringForciblyParsable,
} from '@/library/typeUtilities/StringForciblyParsable.ts';

import {
  isEmpty,
} from '@/library/utilitiesByType/string.ts';

import StringSubset from '../StringSubset.ts';

import NonTrivialString_ParsingError from './ParsingError.ts';

class NonTrivialString
  extends StringSubset<'NonTrivialString'>
  implements StringForciblyParsable<typeof NonTrivialString> {
  public static forciblyParsedFrom = (
    givenSubject: string,
  ): NonTrivialString => {
    const trimmedSubject = givenSubject.trim();

    if (
      isEmpty(trimmedSubject)
    ) return new NonTrivialString_ParsingError(givenSubject).throwAnyway('To be converted to `Attempt` failure');

    return new NonTrivialString(givenSubject);
  };

  public static nullableForciblyParsedFrom = (
    givenSubject: string | null,
  ): NonTrivialString | null => {
    if (givenSubject === null) return givenSubject;

    return this.forciblyParsedFrom(givenSubject);
  };

  public isEqualTo(that: NonTrivialString): boolean {
    return this.toString() === that.toString();
  }
}

export {
  NonTrivialString as default,
  NonTrivialString_ParsingError,
};
