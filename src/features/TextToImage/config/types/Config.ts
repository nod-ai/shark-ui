import type * as WebAPI from '@/library/WebAPI';

/** The user-provided settings for the text-to-image feature */
class TextToImage_Config {
  public constructor(
    /** The details of the server that's providing text-to-image generation */
    public readonly server: WebAPI.Server | null,
  ) {}
}

export {
  TextToImage_Config,
};
