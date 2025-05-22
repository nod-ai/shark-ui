import {
  ActionableError,
} from '@/library/Attempt/error';

class DataURI_ParsingError extends ActionableError<'DataURI_ParsingError'> {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'DataURI_ParsingError';
  }
}

export {
  DataURI_ParsingError as default,
};
