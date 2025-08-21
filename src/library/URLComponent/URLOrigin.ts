import Attempt from '@/library/Attempt';
import type Parsable from '@/library/Parsable';
import ParsingError from '@/library/ParsingError';
import StringSubset from '@/library/StringSubset';

class URLComponent_Origin_ParsingError
  extends ParsingError<
  'URLComponent_Origin'
> {
  public override name = 'URLComponent_Origin_ParsingError' as const;

  public constructor(given: {
    expectation: string;
    reality: string;
  }) {
    super(`Expected pure origin "${given.expectation}", got "${given.reality}"`);
  }
}

class URLComponent_Origin
  extends StringSubset<
  'URLComponent_Origin'
> implements Parsable.String<
  typeof URLComponent_Origin,
  /*  */ URLComponent_Origin_ParsingError
> {
  public static parsedFrom = (
    givenSubject: string,
  ): Attempt.Outcome<URLComponent_Origin, URLComponent_Origin_ParsingError> => Attempt.that((ends) => {
    const derived = new URL(givenSubject);

    const newParsingError = new URLComponent_Origin_ParsingError({
      expectation: derived.origin,
      reality    : givenSubject,
    });

    if (
      derived.origin !== givenSubject
    ) return ends.inFailureDueTo(newParsingError);

    const parsedURLOrigin = new URLComponent_Origin(derived.origin);
    return ends.inSuccessWith(parsedURLOrigin);
  });
}

export {
  URLComponent_Origin,
  URLComponent_Origin_ParsingError,
};
