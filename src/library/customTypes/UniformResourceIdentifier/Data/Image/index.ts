import type Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';

import type {
  DataURI_EncodingIdentifier,
} from '../EncodingIdentifier';

import MediaType from '../MediaType';
import DataURI from '../index.ts';

import type {
  ImageURI_Format,
} from './Format';

class ImageURI
  extends DataURI {
  public static readonly fileType = 'image';

  private readonly _format: ImageURI_Format.Any;

  public constructor(
    givenFormat: ImageURI_Format.Any,
    givenEncoding: DataURI_EncodingIdentifier.Any,
    givenData: Base64CharacterEncodedByteSequence,
  ) {
    super(
      null,
      givenEncoding,
      givenData,
    );
    this._format = givenFormat;
  }

  public get format(): ImageURI['_format'] {
    return this._format;
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
