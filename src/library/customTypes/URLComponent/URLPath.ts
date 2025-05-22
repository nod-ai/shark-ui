import {
  ActionableError,
} from '@/library/Attempt/error';

import StringSubset from '@/library/customTypes/StringSubset.ts';

import type {
  StaticStringParser,
} from '@/library/typeUtilities/StaticStringParser.ts';

export class URLPath_ParsingError extends ActionableError<'URLPath_ParsingError'> {
  public constructor(given: {
    expectation: string;
    reality: string;
  }) {
    super(`Expected pure path: "${given.expectation}", got "${given.reality}"`);
    this.name = 'URLPath_ParsingError';
  }
}

export class URLPath
  extends StringSubset<'URLPath'>
  implements StaticStringParser<typeof URLPath> {
  public static forciblyParsedFrom(givenSubject: string): URLPath {
    const exampleURL = new URL(`https://example.com${givenSubject}`);

    if (
      exampleURL.pathname !== givenSubject
    ) return new URLPath_ParsingError({
      expectation: exampleURL.pathname,
      reality    : givenSubject,
    }).throwAnyway();

    return new URLPath(exampleURL.pathname);
  }
}
