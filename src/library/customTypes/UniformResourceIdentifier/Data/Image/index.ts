import Attempt from '@/library/Attempt';
import type Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';

import type {
  ParsingError,
} from '@/library/Parser';

import type {
  URI_ParsingError,
} from '../..';

import type {
  DataURIBinaryEncoding,
} from '../DataURIBinaryEncoding.ts';

import MediaType from '../MediaType';

import DataURI, {
  type DataURI_ParsingError,
} from '../index.ts';

import {
  allImageURIFormats,
  type ImageURIFormat,
} from './ImageURIFormat.ts';

import ImageURI_ParsingError from './ParsingError.ts';

type ImageURI_EffectiveParsingError =
  | ImageURI_ParsingError
  | DataURI_ParsingError
  | URI_ParsingError
  | ParsingError<string>;

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

  public static override parsedFrom = (
    givenSubject: string,
  ): Attempt.Outcome<ImageURI, ImageURI_EffectiveParsingError> => Attempt.that((ends) => {
    const outcomeOfParsingSubject = super.parsedFrom(givenSubject);

    if (
      outcomeOfParsingSubject.isFailure
    ) return outcomeOfParsingSubject;

    const parsedURI = outcomeOfParsingSubject.unwrapped;

    if (
      parsedURI.mediaType.fileType !== ImageURI.fileType
    ) return ends.inFailureDueTo(new ImageURI_ParsingError(`Expected media type starting with ${ImageURI.fileType}`));

    const parsedFormat = allImageURIFormats.find($0 => $0 === parsedURI.mediaType.fileSubtype);

    if (
      parsedFormat === undefined
    ) return ends.inFailureDueTo(new ImageURI_ParsingError(`Expected format to be one of ${allImageURIFormats.toString()}`));

    const parsedImageURI = new ImageURI(
      parsedFormat,
      parsedURI.encoding,
      parsedURI.data,
    );

    return ends.inSuccessWith(parsedImageURI);
  });
}

export {
  ImageURI as default,
  ImageURI_ParsingError,
};
