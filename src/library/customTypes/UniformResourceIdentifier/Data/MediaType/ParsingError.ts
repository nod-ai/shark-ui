import {
  ActionableError,
} from '@/library/Attempt/error';

class MediaType_ParsingError extends ActionableError<'MediaType_ParsingError'> {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'MediaType_ParsingError';
  }
}

export {
  MediaType_ParsingError as default,
};
