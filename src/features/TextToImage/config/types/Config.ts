import * as WebAPI from '@/library/WebAPI';

/** The user-provided settings for the text-to-image feature */
export class TextToImage_Config {
  public constructor(
    /** The details of the server that's providing text-to-image generation */
    public readonly server: WebAPI.Server | null,
  ) {}
}
