import type Sequence_Byte_Base64CharacterEncoded from '@/library/Base64CharacterEncodedByteSequence';
import ContentDescriptor from '@/library/ContentDescriptor';

import {
  URI_Data,
} from '../Data';

import type {
  URI_Image_Format,
} from './Format';

class URI_Image
  extends URI_Data {
  public static readonly topLevelDescriptor = 'image';

  public constructor(
    public readonly format: URI_Image_Format.Any,
    givenEncoding: URI_Data.EncodingIdentifier.Any,
    givenData: Sequence_Byte_Base64CharacterEncoded,
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
