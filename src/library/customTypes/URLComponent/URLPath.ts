import Attempt from '@/library/Attempt';

import {
  ParsingError,
} from '@/library/Parser';

import type {
  StringParsable,
} from '@/library/Parser/string';

import StringSubset from '@/library/customTypes/StringSubset.ts';

class URLPath_ParsingError
  extends ParsingError<'URLPath'> {
  public constructor(given: {
    expectation: string;
    reality: string;
  }) {
    super(`Expected pure path: "${given.expectation}", got "${given.reality}"`);
    this.name = 'URLPath_ParsingError';
  }
}

class URLPath
  extends StringSubset<'URLPath'>
  implements StringParsable<typeof URLPath> {
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
