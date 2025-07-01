import Attempt from '@/library/Attempt';
import Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';

import type {
  ParsingError,
} from '@/library/Parser';

import NonTrivialString from '@/library/customTypes/NonTrivialString';

import {
  isEmpty,
} from '@/library/utilitiesByType/array.ts';

import UniformResourceIdentifier, {
  type URI_ParsingError,
} from '../index.ts';

import {
  allDataURIBinaryEncodings,
  type DataURIBinaryEncoding,
} from './DataURIBinaryEncoding.ts';

import MediaType from './MediaType';
import DataURI_ParsingError from './ParsingError.ts';

type DataURI_EffectiveParsingError =
  | DataURI_ParsingError
  | URI_ParsingError
  | ParsingError<string>;

/** See [RFC 2397](https://datatracker.ietf.org/doc/rfc2397) for more info */
class DataURI
  extends UniformResourceIdentifier {
  public static readonly scheme = NonTrivialString.parsedFrom('data').forciblyUnwrap();

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

  public static readonly encodingPrefix = ';';

  public get encoding(): DataURI['_encoding'] {
    return this._encoding;
  }

  public get serializableEncoding(): string {
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

  public static override parsedFrom = (
    givenSubject: string,
  ): Attempt.Outcome<DataURI, DataURI_EffectiveParsingError> => Attempt.that((ends) => {
    const outcomeOfParsingSubject = super.parsedFrom(givenSubject);

    if (
      outcomeOfParsingSubject.isFailure
    ) return outcomeOfParsingSubject;

    const proposedURI = outcomeOfParsingSubject.unwrapped;

    if (
      !proposedURI.scheme.isEqualTo(DataURI.scheme)
    ) return ends.inFailureDueTo(new DataURI_ParsingError(`Expected scheme to be "${DataURI.scheme.toString()}"`));

    const [
      mediaTypeAndEncoding,
      rawData,
      ...extraComponentsWithDataPrefix
    ] = proposedURI.path.split(DataURI.dataPrefix);

    if (
      !isEmpty(extraComponentsWithDataPrefix)
    ) return ends.inFailureDueTo(new DataURI_ParsingError(`Unexpected components with data prefix: ${extraComponentsWithDataPrefix.toString()}`));

    if (
      rawData === undefined
    ) return ends.inFailureDueTo(new DataURI_ParsingError('Expected data portion to be defined'));

    const outcomeOfParsingData = Base64CharacterEncodedByteSequence.parsedFrom(rawData);

    if (
      outcomeOfParsingData.isFailure
    ) return outcomeOfParsingData;

    const parsedData = outcomeOfParsingData.unwrapped;

    const [
      rawMediaType,
      rawEncoding,
      ...extraComponentsWithEncodingPrefix
    ] = mediaTypeAndEncoding?.split(DataURI.encodingPrefix) ?? [];

    if (
      !isEmpty(extraComponentsWithEncodingPrefix)
    ) return ends.inFailureDueTo(new DataURI_ParsingError(`Unexpected components with encoding prefix: ${extraComponentsWithEncodingPrefix.toString()}`));

    if (
      rawMediaType === undefined
    ) return ends.inFailureDueTo(new DataURI_ParsingError('Expected `mediaType` portion to be defined'));

    const outcomeOfParsingMediaType = MediaType.parsedFrom(rawMediaType);

    if (
      outcomeOfParsingMediaType.isFailure
    ) return outcomeOfParsingMediaType;

    const parsedMediaType = outcomeOfParsingMediaType.unwrapped;
    const parsedEncoding = allDataURIBinaryEncodings.find($0 => $0 === rawEncoding);

    if (
      parsedEncoding === undefined
    ) return ends.inFailureDueTo(new DataURI_ParsingError(`Expected encoding portion to be defined as one of: ${allDataURIBinaryEncodings.toString()}`));

    const parsedDataURI = new DataURI(
      parsedMediaType,
      parsedEncoding,
      parsedData,
    );

    return ends.inSuccessWith(parsedDataURI);
  });
}

export {
  DataURI as default,
  DataURI_ParsingError,
};
