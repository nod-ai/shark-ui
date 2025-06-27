import Attempt from '@/library/Attempt';
import Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';
import NonTrivialString from '@/library/customTypes/NonTrivialString';

import {
  isEmpty,
} from '@/library/utilitiesByType/array.ts';

import UniformResourceIdentifier from '../index.ts';

import {
  allDataURIBinaryEncodings,
  type DataURIBinaryEncoding,
} from './DataURIBinaryEncoding.ts';

import MediaType from './MediaType';
import DataURI_ParsingError from './ParsingError.ts';

/** See [RFC 2397](https://datatracker.ietf.org/doc/rfc2397) for more info */
class DataURI
  extends UniformResourceIdentifier {
  public static readonly scheme = NonTrivialString.parsedFrom('data').forciblyUnwrap();
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
    if (
      this._mediaType === null
    ) return Attempt.abandon('Media type either needs to be initialized or overridden');

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

    return NonTrivialString.parsedFrom(components.join('')).forciblyUnwrap(/* TODO: prove to compiler that this forcible unwrap will never fail */);
  }

  public static override forciblyParsedFrom = (
    givenSubject: string,
  ): DataURI => {
    const proposedURI = super.forciblyParsedFrom(givenSubject);

    if (
      !proposedURI.scheme.isEqualTo(DataURI.scheme)
    ) return new DataURI_ParsingError(`Expected scheme to be "${DataURI.scheme.toString()}"`).throwAnyway('To be converted to `Attempt` failure');

    const [
      mediaTypeAndEncoding,
      rawData,
      ...extraComponentsWithDataPrefix
    ] = proposedURI.path.split(DataURI.dataPrefix);

    if (
      !isEmpty(extraComponentsWithDataPrefix)
    ) return new DataURI_ParsingError(`Unexpected components with data prefix: ${extraComponentsWithDataPrefix.toString()}`).throwAnyway('To be converted to `Attempt` failure');

    if (
      rawData === undefined
    ) return new DataURI_ParsingError('Expected data portion to be defined').throwAnyway('To be converted to `Attempt` failure');

    const [
      rawMediaType,
      rawEncoding,
      ...extraComponentsWithEncodingPrefix
    ] = mediaTypeAndEncoding?.split(DataURI.encodingPrefix) ?? [];

    if (
      !isEmpty(extraComponentsWithEncodingPrefix)
    ) return new DataURI_ParsingError(`Unexpected components with encoding prefix: ${extraComponentsWithEncodingPrefix.toString()}`).throwAnyway('To be converted to `Attempt` failure');

    if (
      rawMediaType === undefined
    ) return new DataURI_ParsingError('Expected `mediaType` portion to be defined').throwAnyway('To be converted to `Attempt` failure');

    const coercedEncoding = allDataURIBinaryEncodings.find($0 => $0 === rawEncoding);

    if (
      coercedEncoding === undefined
    ) return new DataURI_ParsingError(`Expected encoding portion to be defined as one of: ${allDataURIBinaryEncodings.toString()}`).throwAnyway('To be converted to `Attempt` failure');

    return new DataURI(
      MediaType.forciblyParsedFrom(rawMediaType),
      coercedEncoding,
      Base64CharacterEncodedByteSequence.forciblyParsedFrom(rawData),
    );
  };
}

export {
  DataURI as default,
  DataURI_ParsingError,
};
