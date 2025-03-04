import Base64CharacterEncodedByteSequence from '@/library/customTypes/Base64CharacterEncodedByteSequence.ts';

import NonTrivialString from '@/library/customTypes/NonTrivialString.ts';

import {
  isEmpty,
} from '@/library/utilitiesByType/array.ts';

import UniformResourceIdentifier from '../index.ts';

import {
  allDataURIBinaryEncodings,
  type DataURIBinaryEncoding,
} from './DataURIBinaryEncoding.ts';

import MediaType from './MediaType.ts';

/** See [RFC 2397](https://datatracker.ietf.org/doc/rfc2397) for more info */
export default class DataURI extends UniformResourceIdentifier {
  public static readonly scheme = NonTrivialString.tryToParseFrom('data');
  public static readonly encodingPrefix = ';';
  public static readonly dataPrefix = ',';

  private readonly _mediaType: MediaType | null;
  private readonly _encoding: DataURIBinaryEncoding;
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
    if (this._mediaType === null) throw new Error('Media type either needs to be initialized or overridden');

    return this._mediaType;
  }

  public get encoding(): DataURI['_encoding'] {
    return this._encoding;
  }

  public get data(): DataURI['_data'] {
    return this._data;
  }

  public override get path(): NonTrivialString {
    const components: string[] = [
      this.mediaType.toString(),
      DataURI.encodingPrefix,
      this.encoding,
      DataURI.dataPrefix,
      this.data.toString(),
    ];

    return NonTrivialString.tryToParseFrom(components.join(''));
  }

  public static override tryToParse(givenSubject: string): DataURI {
    const proposedURI = super.tryToParse(givenSubject);

    if (!proposedURI.scheme.isEqualTo(DataURI.scheme)) throw new Error(`Expected scheme to be "${DataURI.scheme.toString()}"`);

    const [
      mediaTypeAndEncoding,
      rawData,
      ...extraComponentsWithDataPrefix
    ] = proposedURI.path.split(DataURI.dataPrefix);

    if (
      !isEmpty(extraComponentsWithDataPrefix)
    ) throw new Error(`Unexpected components with data prefix: ${extraComponentsWithDataPrefix.toString()}`);

    if (rawData === undefined) throw new Error('Expected data portion to be defined');

    const [
      rawMediaType,
      rawEncoding,
      ...extraComponentsWithEncodingPrefix
    ] = mediaTypeAndEncoding?.split(DataURI.encodingPrefix) ?? [];

    if (
      !isEmpty(extraComponentsWithEncodingPrefix)
    ) throw new Error(`Unexpected components with encoding prefix: ${extraComponentsWithEncodingPrefix.toString()}`);

    if (rawMediaType === undefined) throw new Error('Expected `mediaType` portion to be defined');

    const coercedEncoding = allDataURIBinaryEncodings.find($0 => $0 === rawEncoding);

    if (coercedEncoding === undefined) throw new Error(`Expected encoding portion to be defined as one of: ${allDataURIBinaryEncodings.toString()}`);

    return new DataURI(
      MediaType.tryToParse(rawMediaType),
      coercedEncoding,
      Base64CharacterEncodedByteSequence.tryToParse(rawData),
    );
  }
}
