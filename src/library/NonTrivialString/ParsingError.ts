import {
  ParsingError,
} from '@/library/Parser';

class NonTrivialString_ParsingError
  extends ParsingError<
  'NonTrivialString'
> {
  public constructor(
    givenCulprit: string,
  ) {
    super(`Expected string to contain something beyond just whitespace, got "${givenCulprit}"`);
    this.name = 'NonTrivialString_ParsingError';
  }
}

export {
  NonTrivialString_ParsingError as default,
};
