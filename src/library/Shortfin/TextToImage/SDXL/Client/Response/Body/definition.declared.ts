import {
  Schema,
} from 'effect';

import Sequence from '@/library/Sequence';

class Shortfin_TextToImage_SDXL_Client_Response_Body
  extends Schema.Class<Shortfin_TextToImage_SDXL_Client_Response_Body>('Shortfin_TextToImage_SDXL_Client_Response_Body')({
    images: Schema.NonEmptyArray(
      Schema.String.pipe(
        Schema.fromBrand(Sequence.Byte.Encoded.Base64),
      ),
    ),
  }) {
}

export {
  Shortfin_TextToImage_SDXL_Client_Response_Body,
};
