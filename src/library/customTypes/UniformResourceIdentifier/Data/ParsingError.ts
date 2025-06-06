import {
  ParsingError,
} from '@/library/Parser';

class DataURI_ParsingError extends ParsingError<'DataURI'> {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'DataURI_ParsingError';
  }
}

export {
  DataURI_ParsingError as default,
};
