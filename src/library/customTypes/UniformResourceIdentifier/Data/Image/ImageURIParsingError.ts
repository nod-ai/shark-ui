import {
  ActionableError,
} from '@/library/Attempt';

class ImageURIParsingError extends ActionableError<'ImageURIParsingError'> {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'ImageURIParsingError';
  }
}

export default ImageURIParsingError;
