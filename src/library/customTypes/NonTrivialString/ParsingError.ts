import {
  ActionableError,
} from '@/library/Attempt/error';

class NonTrivialStringParsingError extends ActionableError<'NonTrivialStringParsingError'> {
  public constructor(givenCulprit: string) {
    super(`Expected string to contain something beyond just whitespace, got "${givenCulprit}"`);
    this.name = 'NonTrivialStringParsingError';
  }
}

export {
  NonTrivialStringParsingError as default,
};
