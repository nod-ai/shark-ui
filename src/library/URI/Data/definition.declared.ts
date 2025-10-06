import Attempt from '@/library/Attempt';
import type ContentDescriptor from '@/library/ContentDescriptor';
import DepNonTrivialString from '@/library/DepNonTrivialString';
import type Sequence from '@/library/Sequence';

import {
  URI,
} from '../definition.declared.ts';

import type {
  URI_Data_EncodingIdentifier,
} from './EncodingIdentifier';

/** See [RFC 2397](https://datatracker.ietf.org/doc/rfc2397) for more info */
class URI_Data
  extends URI {
  public static readonly scheme = DepNonTrivialString.parsedFrom('data').forciblyUnwrap();

  public constructor(
    private readonly overridableDescriptor: ContentDescriptor | null,
    public readonly encoding: URI_Data_EncodingIdentifier.Any,
    public readonly data: Sequence.Byte.Encoded.Base64,
  ) {
    super(
      URI_Data.scheme,
    );
  }

  public get descriptor(): Exclude<URI_Data['overridableDescriptor'], null> {
    if (
      this.overridableDescriptor === null
    ) return Attempt.abandon('Descriptor either needs to be initialized or overridden');

    return this.overridableDescriptor;
  }

  public static readonly encodingPrefix = ';';

  public get serializableEncoding(): string | null {
    if (
      this.encoding !== 'base64'
    ) return null;

    const prefixedEncoding = URI_Data.encodingPrefix.concat(this.encoding);
    return prefixedEncoding;
  }

  public static readonly dataPrefix = ',';

  public get serializableData(): string {
    const prefixedData = URI_Data.dataPrefix.concat(this.data);
    return prefixedData;
  }

  public override get path(): DepNonTrivialString {
    const orderedPathComponents = [
      this.descriptor.serialized,
      this.serializableEncoding,
      this.serializableData,
    ] as const;

    const serializedPathComponents = DepNonTrivialString.fromConcatenating(...orderedPathComponents);
    return serializedPathComponents;
  }
}

export {
  URI_Data,
};
