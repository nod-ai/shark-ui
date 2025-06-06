import {
  ParsingError,
} from '@/library/Parser';

import StringSubset from '@/library/customTypes/StringSubset.ts';

import type {
  StaticStringParser,
} from '@/library/typeUtilities/StaticStringParser.ts';

class URLPath_ParsingError extends ParsingError<'URLPath'> {
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
  implements StaticStringParser<typeof URLPath> {
  public static forciblyParsedFrom(givenSubject: string): URLPath {
    const exampleURL = new URL(`https://example.com${givenSubject}`);

    if (
      exampleURL.pathname !== givenSubject
    ) return new URLPath_ParsingError({
      expectation: exampleURL.pathname,
      reality    : givenSubject,
    }).throwAnyway('To be converted to `Attempt` failure');

    return new URLPath(exampleURL.pathname);
  }
}

export {
  URLPath,
  URLPath_ParsingError,
};
