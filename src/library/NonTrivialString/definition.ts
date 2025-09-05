import Attempt from '@/library/Attempt';
import type Parsable from '@/library/Parsable';
import StringSubset from '@/library/StringSubset';

import {
  concatenated,
  isEmpty,
  type StringLike,
} from '@/library/utilitiesByType/string';

import {
  _default as NonTrivialString_ParsingError,
} from './ParsingError.ts';

class NonTrivialString
  extends StringSubset<
    'NonTrivialString'
  > implements Parsable.String<
    typeof NonTrivialString,
    /*  */ NonTrivialString_ParsingError
  > {
  public static parsedFrom = (
    givenSubject: string,
  ): Attempt.Outcome<
    NonTrivialString,
    NonTrivialString_ParsingError
  > => Attempt.Fresh_that((ends) => {
    const trimmedSubject = givenSubject.trim();

    if (
      isEmpty(trimmedSubject)
    ) return ends.inFailureDueTo(new NonTrivialString_ParsingError(givenSubject));

    return ends.inSuccessWith(new NonTrivialString(givenSubject));
  });

  public static nullableParsedFrom = (
    givenSubject: string | null,
  ): Attempt.Outcome<
    NonTrivialString | null,
    NonTrivialString_ParsingError
  > => Attempt.Fresh_that((ends) => {
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
    const coercedConcatenatedOperands = outcomeOfParsingConcatenatedOperands.forciblyUnwrap(/* Safe to call since the leading string is always non-trivial and concatenation is purely additive */);
    return coercedConcatenatedOperands;
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
  NonTrivialString,
};
