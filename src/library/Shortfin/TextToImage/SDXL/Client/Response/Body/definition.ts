import type Attempt from '@/library/Attempt';
import type Sequence_Byte_Encoded_Base64 from '@/library/Base64CharacterEncodedByteSequence';
import type Parsable from '@/library/Parsable';
import Parse from '@/library/Parse';
import Schema from '@/library/Schema';

import {
  Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError,
} from './ParsingError';

class Shortfin_TextToImage_SDXL_Client_Response_Body
implements Parsable<
  typeof Shortfin_TextToImage_SDXL_Client_Response_Body,
  /*  */ Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError
> {
  public constructor(
    public images: [
      Sequence_Byte_Encoded_Base64,
      ...Sequence_Byte_Encoded_Base64[],
    ],
  ) {}

  private static Schema = Schema
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

  public static parsedFrom(
    givenSubject: unknown,
  ): Attempt.Outcome<
    Shortfin_TextToImage_SDXL_Client_Response_Body,
    Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError
  > {
    const parsedBody = Parse.instanceFrom(givenSubject, {
      using      : this.Schema,
      failingWith: Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError,
    });

    return parsedBody;
  }
}

export {
  Shortfin_TextToImage_SDXL_Client_Response_Body,
};
