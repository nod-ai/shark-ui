import type * as WebAPI from '@/library/WebAPI';

import {
  TextToImage_Config_Schema,
} from './Config_Schema';

/** The user-provided settings for the text-to-image feature */
class TextToImage_Config {
  public constructor(
    /** The details of the server that's providing text-to-image generation */
    public readonly server: WebAPI.Server | null,
  ) {}

  public static get Schema() {
    return TextToImage_Config_Schema;
  }
}

export {
  TextToImage_Config,
};
