import Attempt from '@/library/Attempt';

import {
  ParsingError,
} from '@/library/Parser';

import type {
  StringParsable,
} from '@/library/Parser/string';

import StringSubset from '@/library/StringSubset';

class URLOrigin_ParsingError
  extends ParsingError<
  'URLOrigin'
> {
  public override name = 'URLOrigin_ParsingError' as const;

  public constructor(given: {
    expectation: string;
    reality: string;
  }) {
    super(`Expected pure origin "${given.expectation}", got "${given.reality}"`);
  }
}

class URLOrigin
  extends StringSubset<
  'URLOrigin'
> implements StringParsable<
  typeof URLOrigin
> {
  public static parsedFrom = (
    givenSubject: string,
  ): Attempt.Outcome<URLOrigin, URLOrigin_ParsingError> => Attempt.that((ends) => {
    const derived = new URL(givenSubject);

    const newParsingError = new URLOrigin_ParsingError({
      expectation: derived.origin,
      reality    : givenSubject,
    });

    if (
      derived.origin !== givenSubject
    ) return ends.inFailureDueTo(newParsingError);

    const parsedURLOrigin = new URLOrigin(derived.origin);
    return ends.inSuccessWith(parsedURLOrigin);
  });
}

export {
  URLOrigin,
  URLOrigin_ParsingError,
};
