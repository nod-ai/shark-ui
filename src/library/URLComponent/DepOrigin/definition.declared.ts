import Attempt from '@/library/Attempt';
import type Parsable from '@/library/Parsable';
import StringSubset from '@/library/StringSubset';

import {
  URLComponent_Origin_ParsingError,
} from './ParsingError';

class URLComponent_DepOrigin
  extends StringSubset<
    'URLComponent_Origin'
  >
  implements Parsable.String<
    typeof URLComponent_DepOrigin,
    /*  */ URLComponent_Origin_ParsingError
  > {
  public static parsedFrom = (
    givenSubject: string,
  ): Attempt.Outcome<
    URLComponent_DepOrigin,
    URLComponent_Origin_ParsingError
  > => Attempt.Fresh.that((ends) => {
    const derived = new URL(givenSubject);

    if (derived.origin !== givenSubject) {
      const newParsingError = new URLComponent_Origin_ParsingError({
        expectation: derived.origin,
        reality    : givenSubject,
      });

      return ends.inFailureDueTo(newParsingError);
    }

    const parsedURLOrigin = new URLComponent_DepOrigin(derived.origin);
    return ends.inSuccessWith(parsedURLOrigin);
  });
}

export {
  URLComponent_DepOrigin,
};
