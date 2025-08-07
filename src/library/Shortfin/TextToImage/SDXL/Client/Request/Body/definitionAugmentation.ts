import {
  Shortfin_TextToImage_SDXL_Client_Request_Body_Batched,
} from './Batched';

import {
  Shortfin_TextToImage_SDXL_Client_Request_Body,
} from './definition.ts';

Shortfin_TextToImage_SDXL_Client_Request_Body.Batched = Shortfin_TextToImage_SDXL_Client_Request_Body_Batched;

declare module './definition.ts' {
  namespace Shortfin_TextToImage_SDXL_Client_Request_Body {
    export {
      Shortfin_TextToImage_SDXL_Client_Request_Body_Batched as Batched,
    };
  }
}
