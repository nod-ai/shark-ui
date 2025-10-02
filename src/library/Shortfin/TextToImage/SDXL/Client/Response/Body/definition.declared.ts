import type Attempt from '@/library/Attempt';
import type Parsable from '@/library/Parsable';
import Parse from '@/library/Parse';
import Schema_old from '@/library/Schema';
import Sequence from '@/library/Sequence';

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
      Sequence.Byte.Encoded.Base64,
      ...Sequence.Byte.Encoded.Base64[],
    ],
  ) {}

  private static Schema_old = Schema_old
    .object({
      images: Schema_old
        .tuple([
          Sequence.Byte.Encoded.Base64.Schema_old,
        ])
        .rest(
          Sequence.Byte.Encoded.Base64.Schema_old,
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
      using      : this.Schema_old,
      failingWith: Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError,
    });

    return parsedBody;
  }
}

export {
  Shortfin_TextToImage_SDXL_Client_Response_Body,
};
