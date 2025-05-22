import {
  ActionableError,
} from '@/library/Attempt/error';

class ImageURI_ParsingError extends ActionableError<'ImageURI_ParsingError'> {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'ImageURI_ParsingError';
  }
}

export {
  ImageURI_ParsingError as default,
};
