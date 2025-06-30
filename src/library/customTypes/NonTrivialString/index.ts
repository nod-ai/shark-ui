import Attempt from '@/library/Attempt';

import type {
  StringParsable,
} from '@/library/Parser/string';

import {
  concatenated,
  isEmpty,
  type StringLike,
} from '@/library/utilitiesByType/string.ts';

import StringSubset from '../StringSubset.ts';

import NonTrivialString_ParsingError from './ParsingError.ts';

class NonTrivialString
  extends StringSubset<
  'NonTrivialString'
> implements StringParsable<
  typeof NonTrivialString
> {
  public static parsedFrom = (
    givenSubject: string,
  ): Attempt.Outcome<NonTrivialString, NonTrivialString_ParsingError> => Attempt.that((ends) => {
    const trimmedSubject = givenSubject.trim();

    if (
      isEmpty(trimmedSubject)
    ) return ends.inFailureDueTo(new NonTrivialString_ParsingError(givenSubject));

    return ends.inSuccessWith(new NonTrivialString(givenSubject));
  });

  public static nullableParsedFrom = (
    givenSubject: string | null,
  ): Attempt.Outcome<NonTrivialString | null, NonTrivialString_ParsingError> => Attempt.that((ends) => {
    if (
      givenSubject === null
    ) return ends.inSuccessWith(givenSubject);

    return this.parsedFrom(givenSubject);
  });

  public isEqualTo(that: NonTrivialString): boolean {
    return this.toString() === that.toString();
  }

  public concatenatedWith(
    ...givenOperands: (StringLike | null)[]
  ): NonTrivialString {
    const concatenatedOperands = concatenated(this, ...givenOperands);
    const outcomeOfParsingConcatenatedOperands = NonTrivialString.parsedFrom(concatenatedOperands);
    return outcomeOfParsingConcatenatedOperands.forciblyUnwrap(/* Safe to call since the leading string is always non-trivial and concatenation is purely additive */);
  }

  public static fromConcatenating(
    ...givenOperands: [
      NonTrivialString,
      ...(StringLike | null)[],
    ]
  ): NonTrivialString {
    const [
      firstOperand,
      ...remainingOperands
    ] = givenOperands;

    return firstOperand.concatenatedWith(...remainingOperands);
  }
}

export {
  NonTrivialString as default,
  NonTrivialString_ParsingError,
};
