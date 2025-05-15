import Attempt from '@/library/Attempt';

import type {
  StaticStringParser,
} from '@/library/typeUtilities/StaticStringParser.ts';

import {
  isEmpty,
} from '@/library/utilitiesByType/string.ts';

import StringSubset from '../StringSubset.ts';

import NonTrivialStringParsingError from './NonTrivialStringParsingError.ts';

class NonTrivialString
  extends StringSubset<'NonTrivialString'>
  implements StaticStringParser<typeof NonTrivialString> {
  public static forciblyParsedFrom(givenSubject: string): NonTrivialString {
    const trimmedSubject = givenSubject.trim();

    if (
      isEmpty(trimmedSubject)
    ) return new NonTrivialStringParsingError(givenSubject).throwAnyway();

    return new NonTrivialString(givenSubject);
  }

  public static nullableParsedFrom(givenSubject: string | null): NonTrivialString | null {
    if (givenSubject === null) return givenSubject;

    return Attempt.toOpaquely(() => this.forciblyParsedFrom(givenSubject));
  }

  public isEqualTo(that: NonTrivialString): boolean {
    return this.toString() === that.toString();
  }
}

export default NonTrivialString;
