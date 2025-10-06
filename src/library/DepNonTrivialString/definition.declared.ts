import Attempt from '@/library/Attempt';
import type Parsable from '@/library/Parsable';
import StringSubset from '@/library/StringSubset';

import {
  concatenated,
  isEmpty,
  type StringLike,
} from '@/library/utilitiesByType/string';

import {
  NonTrivialString_ParsingError,
} from './ParsingError';

class DepNonTrivialString
  extends StringSubset<
    'DepNonTrivialString'
  >
  implements Parsable.String<
    typeof DepNonTrivialString,
    /*  */ NonTrivialString_ParsingError
  > {
  public static parsedFrom = (
    givenSubject: string,
  ): Attempt.Outcome<
    DepNonTrivialString,
    NonTrivialString_ParsingError
  > => Attempt.Fresh.that((ends) => {
    const trimmedSubject = givenSubject.trim();

    if (isEmpty(trimmedSubject)) {
      const newParsingError = new NonTrivialString_ParsingError(givenSubject);
      return ends.inFailureDueTo(newParsingError);
    }

    return ends.inSuccessWith(new DepNonTrivialString(givenSubject));
  });

  public concatenatedWith(
    ...givenOperands: (StringLike | null)[]
  ): DepNonTrivialString {
    const concatenatedOperands = concatenated(this, ...givenOperands);
    const outcomeOfParsingConcatenatedOperands = DepNonTrivialString.parsedFrom(concatenatedOperands);
    const coercedConcatenatedOperands = outcomeOfParsingConcatenatedOperands.forciblyUnwrap(/* Safe to call since the leading string is always non-trivial and concatenation is purely additive */);
    return coercedConcatenatedOperands;
  }

  public static fromConcatenating(
    ...givenOperands: [
      DepNonTrivialString,
      ...(StringLike | null)[],
    ]
  ): DepNonTrivialString {
    const [
      firstOperand,
      ...remainingOperands
    ] = givenOperands;

    return firstOperand.concatenatedWith(...remainingOperands);
  }
}

export {
  DepNonTrivialString,
};
