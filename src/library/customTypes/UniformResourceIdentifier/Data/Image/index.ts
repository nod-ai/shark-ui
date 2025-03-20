import Base64CharacterEncodedByteSequence from '@/library/customTypes/Base64CharacterEncodedByteSequence.ts';

import type {
  DataURIBinaryEncoding,
} from '../DataURIBinaryEncoding.ts';

import MediaType from '../MediaType.ts';

import DataURI from '../index.ts';

import {
  allImageURIFormats,
  type ImageURIFormat,
} from './ImageURIFormat.ts';

export default class ImageURI extends DataURI {
  public static readonly mediaType = 'image';

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
    return new MediaType(
      ImageURI.mediaType,
      null,
      this.format,
      null,
      null,
    );
  }

  public static override tryToParse(givenSubject: string): ImageURI {
    const proposedURI = super.tryToParse(givenSubject);

    if (proposedURI.mediaType.fileType !== ImageURI.mediaType) throw new Error(`Expected media type starting with ${ImageURI.mediaType}`);

    const format = allImageURIFormats.find($0 => $0 === proposedURI.mediaType.fileSubtype);

    if (format === undefined) throw new Error(`Expected format to be one of ${allImageURIFormats.toString()}`);

    return new ImageURI(
      format,
      proposedURI.encoding,
      proposedURI.data,
    );
  }
}
