import type Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';
import ContentDescriptor from '@/library/ContentDescriptor';

import type {
  URI_Data_EncodingIdentifier,
} from '../EncodingIdentifier';

import {
  URI_Data,
} from '../definition.ts';

import type {
  ImageURI_Format,
} from './Format';

class URI_Image
  extends URI_Data {
  public static readonly topLevelDescriptor = 'image';

  public constructor(
    public readonly format: ImageURI_Format.Any,
    givenEncoding: URI_Data_EncodingIdentifier.Any,
    givenData: Base64CharacterEncodedByteSequence,
  ) {
    super(
      null,
      givenEncoding,
      givenData,
    );
  }

  public override get descriptor(): URI_Data['descriptor'] {
    const computedDescriptor = new ContentDescriptor(
      URI_Image.topLevelDescriptor,
      null,
      this.format,
      null,
      null,
    );

    return computedDescriptor;
  }
}

export {
  URI_Image,
};
