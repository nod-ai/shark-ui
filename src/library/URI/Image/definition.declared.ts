import {
  Option,
} from 'effect';

import ContentDescriptor from '@/library/ContentDescriptor';
import type Sequence from '@/library/Sequence';

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
    givenData: Sequence.Byte.Encoded.Base64,
  ) {
    super(
      Option.none(),
      givenEncoding,
      givenData,
    );
  }

  public override get descriptor(): URI_Data['descriptor'] {
    const computedDescriptor = new ContentDescriptor(
      URI_Image.topLevelDescriptor,
      Option.none(),
      this.format,
      Option.none(),
      Option.none(),
    );

    return computedDescriptor;
  }
}

export {
  URI_Image,
};
