import type Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';
import MediaType from '@/library/MediaType';

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

  public override get mediaType(): DataURI['mediaType'] {
    const computedMediaType = new MediaType(
      ImageURI.fileType,
      null,
      this.format,
      null,
      null,
    );

    return computedMediaType;
  }
}

export {
  ImageURI as default,
};
