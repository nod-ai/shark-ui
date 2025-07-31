import Attempt from '@/library/Attempt';
import type Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence/exports';
import type ContentDescriptor from '@/library/ContentDescriptor/exports';
import NonTrivialString from '@/library/NonTrivialString/exports';

import UniformResourceIdentifier from '../definition.ts';

import type {
  DataURI_EncodingIdentifier,
} from './EncodingIdentifier';

/** See [RFC 2397](https://datatracker.ietf.org/doc/rfc2397) for more info */
class DataURI
  extends UniformResourceIdentifier {
  public static readonly scheme = NonTrivialString.parsedFrom('data').forciblyUnwrap();

  public constructor(
    private readonly overridableDescriptor: ContentDescriptor | null,
    public readonly encoding: DataURI_EncodingIdentifier.Any,
    public readonly data: Base64CharacterEncodedByteSequence,
  ) {
    super(
      DataURI.scheme,
    );
  }

  public get descriptor(): Exclude<DataURI['overridableDescriptor'], null> {
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

    return DataURI.encodingPrefix.concat(this.encoding);
  }

  public static readonly dataPrefix = ',';

  public get serializableData(): string {
    return this.data.prependedWith(DataURI.dataPrefix);
  }

  public override get path(): NonTrivialString {
    const orderedPathComponents = [
      this.descriptor.serialized,
      this.serializableEncoding,
      this.serializableData,
    ] as const;

    const serializedPathComponents = NonTrivialString.fromConcatenating(...orderedPathComponents);
    return serializedPathComponents;
  }
}

export {
  DataURI as default,
};
