import {
  Schema,
} from 'effect';

import type Attempt from '@/library/Attempt';
import type Parsable from '@/library/Parsable';
import Parse from '@/library/Parse';
import Sequence from '@/library/Sequence';

import {
  Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError,
} from './ParsingError';

class Shortfin_TextToImage_SDXL_Client_Response_Body
  extends Schema.Class<Shortfin_TextToImage_SDXL_Client_Response_Body>('Shortfin_TextToImage_SDXL_Client_Response_Body')({
    images: Schema.NonEmptyArray(Sequence.Byte.Encoded.Base64_dep.Schema),
  })
  implements Parsable<
    typeof Shortfin_TextToImage_SDXL_Client_Response_Body,
    /*  */ Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError
  > {
  public static parsedFrom(
    givenSubject: unknown,
  ): Attempt.Outcome<
    Shortfin_TextToImage_SDXL_Client_Response_Body,
    Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError
  > {
    const parsedBody = Parse.instanceFrom(givenSubject, {
      using      : this,
      failingWith: Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError,
    });

    return parsedBody;
  }
}

export {
  Shortfin_TextToImage_SDXL_Client_Response_Body,
};
