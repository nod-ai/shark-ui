import {
  ActionableError,
} from '@/library/Attempt/error';

class URIParsingError extends ActionableError<'URIParsingError'> {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'URIParsingError';
  }
}

export {
  URIParsingError as default,
};
