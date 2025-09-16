import Attempt from '@/library/Attempt';
import type Parsable from '@/library/Parsable';
import StringSubset from '@/library/StringSubset';

import {
  URLComponent_Origin_ParsingError,
} from './ParsingError';

class URLComponent_Origin
  extends StringSubset<
    'URLComponent_Origin'
  > implements Parsable.String<
    typeof URLComponent_Origin,
    /*  */ URLComponent_Origin_ParsingError
  > {
  public static parsedFrom = (
    givenSubject: string,
  ): Attempt.Outcome<
    URLComponent_Origin,
    URLComponent_Origin_ParsingError
  > => Attempt.Fresh.that((ends) => {
    const derived = new URL(givenSubject);

    const newParsingError = new URLComponent_Origin_ParsingError({
      expectation: derived.origin,
      reality    : givenSubject,
    });

    if (derived.origin !== givenSubject) { // eslint-disable-line curly
      return ends.inFailureDueTo(newParsingError);
    }

    const parsedURLOrigin = new URLComponent_Origin(derived.origin);
    return ends.inSuccessWith(parsedURLOrigin);
  });
}

export {
  URLComponent_Origin,
};
