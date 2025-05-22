import {
  ActionableError,
} from '@/library/Attempt/error';

class NonTrivialString_ParsingError extends ActionableError<'NonTrivialString_ParsingError'> {
  public constructor(givenCulprit: string) {
    super(`Expected string to contain something beyond just whitespace, got "${givenCulprit}"`);
    this.name = 'NonTrivialString_ParsingError';
  }
}

export {
  NonTrivialString_ParsingError as default,
};
