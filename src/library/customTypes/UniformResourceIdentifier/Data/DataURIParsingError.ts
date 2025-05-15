import {
  ActionableError,
} from '@/library/Attempt';

class DataURIParsingError extends ActionableError<'DataURIParsingError'> {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'DataURIParsingError';
  }
}

export default DataURIParsingError;
