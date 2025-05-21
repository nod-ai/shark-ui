import {
  ActionableError,
} from '@/library/Attempt/error';

import StringSubset from '@/library/customTypes/StringSubset.ts';

import type {
  StaticStringParser,
} from '@/library/typeUtilities/StaticStringParser.ts';

export class URLPathParsingError extends ActionableError<'URLPathParsingError'> {
  public constructor(given: {
    expectation: string;
    reality: string;
  }) {
    super(`Expected pure path: "${given.expectation}", got "${given.reality}"`);
    this.name = 'URLPathParsingError';
  }
}

export class URLPath
  extends StringSubset<'URLPath'>
  implements StaticStringParser<typeof URLPath> {
  public static forciblyParsedFrom(givenSubject: string): URLPath {
    const exampleURL = new URL(`https://example.com${givenSubject}`);

    if (
      exampleURL.pathname !== givenSubject
    ) return new URLPathParsingError({
      expectation: exampleURL.pathname,
      reality    : givenSubject,
    }).throwAnyway();

    return new URLPath(exampleURL.pathname);
  }
}
