import {
  ParsingError,
} from '@/library/Parser';

import StringSubset from '@/library/customTypes/StringSubset.ts';

import type {
  StringForciblyParsable,
} from '@/library/typeUtilities/StringForciblyParsable';

class URLOrigin_ParsingError extends ParsingError<'URLOrigin'> {
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
  implements StringForciblyParsable<typeof URLOrigin> {
  public static forciblyParsedFrom = (
    givenSubject: string,
  ): URLOrigin => {
    const derived = new URL(givenSubject);

    const newParsingError = new URLOrigin_ParsingError({
      expectation: derived.origin,
      reality    : givenSubject,
    });

    if (
      derived.origin !== givenSubject
    ) return newParsingError.throwAnyway('To be converted to `Attempt` failure');

    const parsedURLOrigin = new URLOrigin(derived.origin);
    return parsedURLOrigin;
  };
}

export {
  URLOrigin,
  URLOrigin_ParsingError,
};
