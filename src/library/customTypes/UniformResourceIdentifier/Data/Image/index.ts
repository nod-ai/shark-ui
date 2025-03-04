import type {
  Base64CharacterEncodedByteSequence,
} from '@/library/customTypes/Base64CharacterEncodedByteSequence.ts';

import MediaType from '../MediaType.ts';

import DataURI, {
  type BinaryDataEncoding,
} from '../index.ts';

export type ImageFormat =
  | 'png'
  | 'jpeg'
  | 'gif'
  | 'webp';

export default class ImageURI extends DataURI {
  public static readonly mediaType = 'image';

  constructor(
    format: ImageFormat,
    encoding: BinaryDataEncoding,
    data: Base64CharacterEncodedByteSequence,
  ) {
    const imageType = new MediaType(
      ImageURI.mediaType,
      null,
      format,
      null,
      null,
    );

    super(
      imageType,
      encoding,
      data,
    );
  }
}
