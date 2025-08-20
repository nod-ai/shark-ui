import Attempt from '@/library/Attempt';

import {
  ParsingError,
} from '@/library/Parser';

import type {
  Parsable_String,
} from '@/library/Parser/string';

import StringSubset from '@/library/StringSubset';

class URLPath_ParsingError
  extends ParsingError<
  'URLPath'
> {
  public override name = 'URLPath_ParsingError' as const;

  public constructor(given: {
    expectation: string;
    reality: string;
  }) {
    super(`Expected pure path: "${given.expectation}", got "${given.reality}"`);
  }
}

class URLPath
  extends StringSubset<
  'URLPath'
> implements Parsable_String<
  typeof URLPath,
  /*  */ URLPath_ParsingError
> {
  public static parsedFrom = (
    givenSubject: string,
  ): Attempt.Outcome<URLPath, URLPath_ParsingError> => Attempt.that((ends) => {
    const exampleURL = new URL(`https://example.com${givenSubject}`);

    const newParsingError = new URLPath_ParsingError({
      expectation: exampleURL.pathname,
      reality    : givenSubject,
    });

    if (
      exampleURL.pathname !== givenSubject
    ) return ends.inFailureDueTo(newParsingError);

    const parsedURLPath = new URLPath(exampleURL.pathname);
    return ends.inSuccessWith(parsedURLPath);
  });
}

export {
  URLPath,
  URLPath_ParsingError,
};
