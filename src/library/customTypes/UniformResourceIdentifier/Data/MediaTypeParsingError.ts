import {
  ActionableError,
} from '@/library/Attempt/error';

class MediaTypeParsingError extends ActionableError<'MediaTypeParsingError'> {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'MediaTypeParsingError';
  }
}

export default MediaTypeParsingError;
