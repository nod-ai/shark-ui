import ParsingError from '@/library/ParsingError';

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

export {
  URLComponent_Origin_ParsingError,
};
