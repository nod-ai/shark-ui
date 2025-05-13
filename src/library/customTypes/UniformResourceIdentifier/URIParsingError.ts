import {
  ActionableError,
} from '@/library/Attempt';

class URIParsingError extends ActionableError<'URIParsingError'> {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'URIParsingError';
  }
}

export default URIParsingError;
