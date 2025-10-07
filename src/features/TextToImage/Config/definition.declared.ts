import {
  Schema,
} from 'effect';

import WebAPI from '@/library/WebAPI';

/** The user-provided settings for the text-to-image feature */
class TextToImage_Config
  extends Schema.Class<TextToImage_Config>('TextToImage_Config')({
    /** The details of the server that's providing text-to-image generation */
    server: Schema.NullOr(WebAPI.Server),
  }) {
}

export {
  TextToImage_Config,
};
