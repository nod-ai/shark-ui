import {
  ActionableError,
} from '@/library/Attempt/error';

class ImageURIParsingError extends ActionableError<'ImageURIParsingError'> {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'ImageURIParsingError';
  }
}

export {
  ImageURIParsingError as default,
};
