import Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';
import Schema from '@/library/Schema';

const Shortfin_TextToImage_SDXL_Client_Response_Body = {
  SchemaMember: {
    image: Schema.string().transform((someSubject, currentContext) => {
      const outcomeOfParsingSubject = Base64CharacterEncodedByteSequence.parsedFrom(someSubject);

      if (
        outcomeOfParsingSubject.isSuccess
      ) return outcomeOfParsingSubject.unwrapped;

      currentContext.addIssue({
        code   : 'custom',
        message: outcomeOfParsingSubject.cause.message,
      });

      return outcomeOfParsingSubject.forciblyUnwrap(/* TODO: safely adapt errors so it can propagate to encompassing schemas */);
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
