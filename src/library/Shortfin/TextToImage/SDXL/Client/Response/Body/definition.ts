import Schema from '@/library/Schema';

const Shortfin_TextToImage_SDXL_Client_Response_Body = {
  get Schema() {
    return Schema.object({
      images: this.SchemaMember.images,
    });
  },
  SchemaMember: {
    images: Schema
      .tuple([
        Schema.base64CharacterEncodedByteSequence(),
      ])
      .rest(
        Schema.base64CharacterEncodedByteSequence(),
      ),
  },
};

export {
  Shortfin_TextToImage_SDXL_Client_Response_Body,
};
