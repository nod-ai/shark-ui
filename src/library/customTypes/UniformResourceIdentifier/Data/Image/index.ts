import type Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';

import type {
  DataURIBinaryEncoding,
} from '../DataURIBinaryEncoding.ts';

import MediaType from '../MediaType';
import DataURI from '../index.ts';

import {
  allImageURIFormats,
  type ImageURIFormat,
} from './ImageURIFormat.ts';

import ImageURI_ParsingError from './ParsingError.ts';

class ImageURI
  extends DataURI {
  public static readonly fileType = 'image';

  private readonly _format: ImageURIFormat;

  public constructor(
    givenFormat: ImageURIFormat,
    givenEncoding: DataURIBinaryEncoding,
    givenData: Base64CharacterEncodedByteSequence,
  ) {
    super(
      null,
      givenEncoding,
      givenData,
    );
    this._format = givenFormat;
  }

  public get format(): ImageURI['_format'] {
    return this._format;
  }

  public override get mediaType(): DataURI['mediaType'] {
    const computedMediaType = new MediaType(
      ImageURI.fileType,
      null,
      this.format,
      null,
      null,
    );

    return computedMediaType;
  }

  public static override forciblyParsedFrom = (
    givenSubject: string,
  ): ImageURI => {
    const proposedURI = super.forciblyParsedFrom(givenSubject);

    if (
      proposedURI.mediaType.fileType !== ImageURI.fileType
    ) return new ImageURI_ParsingError(`Expected media type starting with ${ImageURI.fileType}`).throwAnyway('To be converted to `Attempt` failure');

    const format = allImageURIFormats.find($0 => $0 === proposedURI.mediaType.fileSubtype);

    if (
      format === undefined
    ) return new ImageURI_ParsingError(`Expected format to be one of ${allImageURIFormats.toString()}`).throwAnyway('To be converted to `Attempt` failure');

    const parsedImageURI = new ImageURI(
      format,
      proposedURI.encoding,
      proposedURI.data,
    );

    return parsedImageURI;
  };
}

export {
  ImageURI as default,
  ImageURI_ParsingError,
};
