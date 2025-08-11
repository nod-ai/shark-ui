import Schema from '@/library/Schema';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
class Shortfin_TextToImage_SDXL_Client_Response_Body {
  public static Schema = Schema
    .object({
      images: Schema
        .tuple([
          Schema.base64CharacterEncodedByteSequence(),
        ])
        .rest(
          Schema.base64CharacterEncodedByteSequence(),
        ),
    });
}

export {
  Shortfin_TextToImage_SDXL_Client_Response_Body,
};
