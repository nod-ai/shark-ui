import Attempt from '@/library/Attempt';
import type Parsable from '@/library/Parsable';
import StringSubset from '@/library/StringSubset';

import {
  URLComponent_Path_ParsingError,
} from './ParsingError';

class URLComponent_Path
  extends StringSubset<
    'URLComponent_Path'
  > implements Parsable.String<
    typeof URLComponent_Path,
    /*  */ URLComponent_Path_ParsingError
  > {
  public static parsedFrom = (
    givenSubject: string,
  ): Attempt.Outcome<
    URLComponent_Path,
    URLComponent_Path_ParsingError
  > => Attempt.Fresh_that((ends) => {
    const exampleURL = new URL(`https://example.com${givenSubject}`);

    const newParsingError = new URLComponent_Path_ParsingError({
      expectation: exampleURL.pathname,
      reality    : givenSubject,
    });

    if (
      exampleURL.pathname !== givenSubject
    ) return ends.inFailureDueTo(newParsingError);

    const parsedURLPath = new URLComponent_Path(exampleURL.pathname);
    return ends.inSuccessWith(parsedURLPath);
  });
}

export {
  URLComponent_Path,
  URLComponent_Path_ParsingError,
};
