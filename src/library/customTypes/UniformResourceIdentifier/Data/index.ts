import Attempt from '@/library/Attempt';
import type Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';
import type MediaType from '@/library/MediaType';
import NonTrivialString from '@/library/customTypes/NonTrivialString';

import UniformResourceIdentifier from '../index.ts';

import type {
  DataURI_EncodingIdentifier,
} from './EncodingIdentifier';

/** See [RFC 2397](https://datatracker.ietf.org/doc/rfc2397) for more info */
class DataURI
  extends UniformResourceIdentifier {
  public static readonly scheme = NonTrivialString.parsedFrom('data').forciblyUnwrap();

  public constructor(
    private readonly overridableMediaType: MediaType | null,
    public readonly encoding: DataURI_EncodingIdentifier.Any,
    public readonly data: Base64CharacterEncodedByteSequence,
  ) {
    super(
      DataURI.scheme,
    );
  }

  public get mediaType(): Exclude<DataURI['overridableMediaType'], null> {
    if (
      this.overridableMediaType === null
    ) return Attempt.abandon('Media type either needs to be initialized or overridden');

    return this.overridableMediaType;
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
      this.mediaType.serialized,
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
