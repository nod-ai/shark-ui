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

  private readonly _mediaType: MediaType | null;
  private readonly _encoding: DataURI_EncodingIdentifier.Any;
  private readonly _data: Base64CharacterEncodedByteSequence;

  public constructor(
    givenMediaType: DataURI['_mediaType'],
    givenEncoding: DataURI['_encoding'],
    givenData: DataURI['_data'],
  ) {
    super(
      DataURI.scheme,
    );

    this._mediaType = givenMediaType;
    this._encoding = givenEncoding;
    this._data = givenData;
  }

  public get mediaType(): Exclude<DataURI['_mediaType'], null> {
    if (
      this._mediaType === null
    ) return Attempt.abandon('Media type either needs to be initialized or overridden');

    return this._mediaType;
  }

  public static readonly encodingPrefix = ';';

  public get encoding(): DataURI['_encoding'] {
    return this._encoding;
  }

  public get serializableEncoding(): string | null {
    if (
      this.encoding !== 'base64'
    ) return null;

    return DataURI.encodingPrefix.concat(this.encoding);
  }

  public static readonly dataPrefix = ',';

  public get data(): DataURI['_data'] {
    return this._data;
  }

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
