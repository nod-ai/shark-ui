import {
  ParsingError,
} from '@/library/Parser/exports';

class NonTrivialString_ParsingError
  extends ParsingError<
  'NonTrivialString'
> {
  public override name = 'NonTrivialString_ParsingError' as const;

  public constructor(
    givenCulprit: string,
  ) {
    super(`Expected string to contain something beyond just whitespace, got "${givenCulprit}"`);
  }
}

export {
  NonTrivialString_ParsingError as default,
};
