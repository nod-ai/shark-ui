import type Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';
import Schema from '@/library/Schema';

class Shortfin_TextToImage_SDXL_Client_Response_Body {
  public constructor(
    public images: [
      Base64CharacterEncodedByteSequence,
      ...Base64CharacterEncodedByteSequence[],
    ],
  ) {}

  public static Schema = Schema
    .object({
      images: Schema
        .tuple([
          Schema.base64CharacterEncodedByteSequence(),
        ])
        .rest(
          Schema.base64CharacterEncodedByteSequence(),
        ),
    })
    .transform($0 => new Shortfin_TextToImage_SDXL_Client_Response_Body(
      $0.images,
    ));
}

export {
  Shortfin_TextToImage_SDXL_Client_Response_Body,
};
