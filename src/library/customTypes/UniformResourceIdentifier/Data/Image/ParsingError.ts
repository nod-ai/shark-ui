import {
  ParsingError,
} from '@/library/Parser';

class ImageURI_ParsingError
  extends ParsingError<'ImageURI'> {
  public constructor(givenMessage: string) {
    super(givenMessage);
    this.name = 'ImageURI_ParsingError';
  }
}

export {
  ImageURI_ParsingError as default,
};
