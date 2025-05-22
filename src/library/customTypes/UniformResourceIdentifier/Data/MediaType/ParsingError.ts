import {
  ParsingError,
} from '@/library/Parser';

class MediaType_ParsingError extends ParsingError<'MediaType'> {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'MediaType_ParsingError';
  }
}

export {
  MediaType_ParsingError as default,
};
