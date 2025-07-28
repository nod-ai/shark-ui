import type Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence/definition';
import ContentDescriptor from '@/library/ContentDescriptor';

import type {
  DataURI_EncodingIdentifier,
} from '../EncodingIdentifier';

import DataURI from '../index.ts';

import type {
  ImageURI_Format,
} from './Format';

class ImageURI
  extends DataURI {
  public static readonly fileType = 'image';

  public constructor(
    public readonly format: ImageURI_Format.Any,
    givenEncoding: DataURI_EncodingIdentifier.Any,
    givenData: Base64CharacterEncodedByteSequence,
  ) {
    super(
      null,
      givenEncoding,
      givenData,
    );
  }

  public override get descriptor(): DataURI['descriptor'] {
    const computedDescriptor = new ContentDescriptor(
      ImageURI.fileType,
      null,
      this.format,
      null,
      null,
    );

    return computedDescriptor;
  }
}

export {
  ImageURI as default,
};
