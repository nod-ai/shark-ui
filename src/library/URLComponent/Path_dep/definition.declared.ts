import Attempt from '@/library/Attempt';
import type Parsable from '@/library/Parsable';
import StringSubset from '@/library/StringSubset';

import {
  URLComponent_Path,
} from '../Path';

import {
  URLComponent_Path_ParsingError,
} from './ParsingError';

class URLComponent_Path_dep
  extends StringSubset<
    'URLComponent_Path'
  >
  implements Parsable.String<
    typeof URLComponent_Path_dep,
    /*  */ URLComponent_Path_ParsingError
  > {
  public static parsedFrom = (
    givenSubject: string,
  ): Attempt.Outcome<
    URLComponent_Path_dep,
    URLComponent_Path_ParsingError
  > => Attempt.Fresh.that((ends) => {
    if (URLComponent_Path.is(givenSubject)) {
      const parsedURLPath = new URLComponent_Path_dep(givenSubject);
      return ends.inSuccessWith(parsedURLPath);
    }

    const exampleURL = new URL(`https://example.com${givenSubject}`);

    const newParsingError = new URLComponent_Path_ParsingError({
      expectation: exampleURL.pathname,
      reality    : givenSubject,
    });

    return ends.inFailureDueTo(newParsingError);
  });
}

export {
  URLComponent_Path_dep,
};
