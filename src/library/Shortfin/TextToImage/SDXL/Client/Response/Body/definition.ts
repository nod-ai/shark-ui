import Schema from '@/library/Schema';

const Shortfin_TextToImage_SDXL_Client_Response_Body = {
  SchemaMember: {
    image: Schema.base64CharacterEncodedByteSequence(),
    get images() {
      return Schema
        .tuple([this.image])
        .rest(this.image);
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
