import Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';
import Schema from '@/library/Schema';

const Shortfin_TextToImage_SDXL_Client_Response_Body = {
  SchemaMember: {
    image: Schema.string().transform((someSubject) => {
      return Base64CharacterEncodedByteSequence.parsedFrom(someSubject).forciblyUnwrap(/* Zod can safely propagate errors */);
    }),
    get images() {
      return Schema.tuple([this.image]).rest(this.image);
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
