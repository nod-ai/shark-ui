import {
  isEmpty,
} from '@/library/utilitiesByType/string.ts';

import StringSubset from './StringSubset.ts';

export default class NonTrivialString extends StringSubset<'NonTrivialString'> {
  public static tryToParseFrom(givenSubject: string): NonTrivialString {
    const trimmedSubject = givenSubject.trim();

    if (isEmpty(trimmedSubject)) throw new Error('Expected a non-trivial string');

    return new NonTrivialString(givenSubject);
  }

  public static nullableParsedFrom(givenSubject: string | null): NonTrivialString | null {
    if (givenSubject === null) return givenSubject;

    try {
      return this.tryToParseFrom(givenSubject);
    }
    catch {
      return null;
    }
  }

  public isEqualTo(that: NonTrivialString): boolean {
    return this.toString() === that.toString();
  }
}
