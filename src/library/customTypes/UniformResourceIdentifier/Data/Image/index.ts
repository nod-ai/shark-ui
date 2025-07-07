import type Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';

import type {
  DataURIBinaryEncoding,
} from '../DataURIBinaryEncoding.ts';

import MediaType from '../MediaType';
import DataURI from '../index.ts';

import type {
  ImageURIFormat,
} from './ImageURIFormat.ts';

class ImageURI
  extends DataURI {
  public static readonly fileType = 'image';

  private readonly _format: ImageURIFormat;

  public constructor(
    givenFormat: ImageURIFormat,
    givenEncoding: DataURIBinaryEncoding,
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
