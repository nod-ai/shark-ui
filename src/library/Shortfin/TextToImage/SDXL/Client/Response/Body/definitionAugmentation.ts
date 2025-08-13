import {
  Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError,
} from './ParsingError';

import {
  Shortfin_TextToImage_SDXL_Client_Response_Body,
} from './definition.ts';

Shortfin_TextToImage_SDXL_Client_Response_Body.ParsingError = Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError;

declare module './definition.ts' {
  namespace Shortfin_TextToImage_SDXL_Client_Response_Body {
    export {
      Shortfin_TextToImage_SDXL_Client_Response_Body_ParsingError as ParsingError,
    };
  }
}
