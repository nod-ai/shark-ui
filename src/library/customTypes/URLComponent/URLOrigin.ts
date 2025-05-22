import {
  ActionableError,
} from '@/library/Attempt/error';

import StringSubset from '@/library/customTypes/StringSubset.ts';

import type {
  StaticStringParser,
} from '@/library/typeUtilities/StaticStringParser.ts';

class URLOrigin_ParsingError extends ActionableError<'URLOrigin_ParsingError'> {
  public constructor(given: {
    expectation: string;
    reality: string;
  }) {
    super(`Expected pure origin "${given.expectation}", got "${given.reality}"`);
    this.name = 'URLOrigin_ParsingError';
  }
}

class URLOrigin
  extends StringSubset<'URLOrigin'>
  implements StaticStringParser<typeof URLOrigin> {
  public static forciblyParsedFrom(givenSubject: string): URLOrigin {
    const derived = new URL(givenSubject);

    if (
      derived.origin !== givenSubject
    ) return new URLOrigin_ParsingError({
      expectation: derived.origin,
      reality    : givenSubject,
    }).throwAnyway();

    return new URLOrigin(derived.origin);
  }
}

export {
  URLOrigin,
  URLOrigin_ParsingError,
};
