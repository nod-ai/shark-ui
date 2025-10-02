import {
  Schema,
} from 'effect';

import type Attempt from '@/library/Attempt';
import type Parsable from '@/library/Parsable';
import Parse from '@/library/Parse';
import WebAPI from '@/library/WebAPI';

import {
  TextToImage_Config_ParsingError,
} from './ParsingError';

/** The user-provided settings for the text-to-image feature */
class TextToImage_Config
  extends Schema.Class<TextToImage_Config>('TextToImage_Config')({
    /** The details of the server that's providing text-to-image generation */
    server: Schema.NullOr(WebAPI.Server),
  })
  implements Parsable<
    typeof TextToImage_Config,
    /*  */ TextToImage_Config_ParsingError
  > {
  public static parsedFrom(
    givenSubject: unknown,
  ): Attempt.Outcome<
    TextToImage_Config,
    TextToImage_Config_ParsingError
  > {
    const parsedConfig = Parse.instanceFrom(givenSubject, {
      using      : this,
      failingWith: TextToImage_Config_ParsingError,
    });

    return parsedConfig;
  }
}

export {
  TextToImage_Config,
};
