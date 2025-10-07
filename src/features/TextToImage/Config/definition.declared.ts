import {
  Schema,
} from 'effect';

import Attempt from '@/library/Attempt';
import WebAPI from '@/library/WebAPI';

import type {
  TextToImage_Config_ParsingError,
} from './ParsingError';

/** The user-provided settings for the text-to-image feature */
class TextToImage_Config
  extends Schema.Class<TextToImage_Config>('TextToImage_Config')({
    /** The details of the server that's providing text-to-image generation */
    server: Schema.NullOr(WebAPI.Server),
  }) {
  public static parsedFrom(
    givenSubject: unknown,
  ): Attempt.Outcome<
    TextToImage_Config,
    TextToImage_Config_ParsingError
  > {
    return Attempt.abandon('Pass', {
      cause: givenSubject,
    });
  }
}

export {
  TextToImage_Config,
};
