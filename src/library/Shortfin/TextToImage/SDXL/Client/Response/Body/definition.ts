import Schema from '@/library/Schema';

const Shortfin_TextToImage_SDXL_Client_Response_Body = {
  Schema: Schema.object({
    images: Schema
      .tuple([
        Schema.base64CharacterEncodedByteSequence(),
      ])
      .rest(
        Schema.base64CharacterEncodedByteSequence(),
      ),
  }),
};

export {
  Shortfin_TextToImage_SDXL_Client_Response_Body,
};
