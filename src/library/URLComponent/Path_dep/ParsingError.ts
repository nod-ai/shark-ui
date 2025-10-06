import ParsingError from '@/library/ParsingError';

class URLComponent_Path_ParsingError
  extends ParsingError<
    'URLComponent_Path'
  > {
  public override name = 'URLComponent_Path_ParsingError' as const;

  public constructor(given: {
    expectation: string;
    reality: string;
  }) {
    super(`Expected pure path: "${given.expectation}", got "${given.reality}"`);
  }
}

export {
  URLComponent_Path_ParsingError,
};
