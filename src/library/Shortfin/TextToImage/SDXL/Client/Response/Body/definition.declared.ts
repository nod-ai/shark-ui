import {
  Schema,
} from 'effect';

import Attempt from '@/library/Attempt';
import Sequence from '@/library/Sequence';

import type {
  Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError,
} from './ParsingError';

class Shortfin_TextToImage_SDXL_Client_Response_Body
  extends Schema.Class<Shortfin_TextToImage_SDXL_Client_Response_Body>('Shortfin_TextToImage_SDXL_Client_Response_Body')({
    images: Schema.NonEmptyArray(
      Schema.String.pipe(
        Schema.fromBrand(Sequence.Byte.Encoded.Base64),
      ),
    ),
  }) {
  private static parsedFrom(
    givenSubject: unknown,
  ): Attempt.Outcome<
    Shortfin_TextToImage_SDXL_Client_Response_Body,
    Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError
  > {
    return Attempt.abandon('Pass', {
      cause: givenSubject,
    });
  }
}

export {
  Shortfin_TextToImage_SDXL_Client_Response_Body,
};
