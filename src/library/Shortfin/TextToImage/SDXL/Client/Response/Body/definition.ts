import Schema from '@/library/Schema';

const Shortfin_TextToImage_SDXL_Client_Response_Body = {
  SchemaMember: {
    get images() {
      return Schema
        .tuple([
          Schema.base64CharacterEncodedByteSequence(),
        ])
        .rest(
          Schema.base64CharacterEncodedByteSequence(),
        );
    },
  },
  get Schema() {
    return Schema.object({
      images: this.SchemaMember.images,
    });
  },
};

export {
  Shortfin_TextToImage_SDXL_Client_Response_Body,
};
