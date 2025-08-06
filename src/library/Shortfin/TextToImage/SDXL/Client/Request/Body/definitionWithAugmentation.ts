import type {
  Shortfin_TextToImage_SDXL_Client_Request_Body_Batched,
} from './Batched';

import type {
  Shortfin_TextToImage_SDXL_Client_Request_Body,
} from './definition.ts';

declare module './definition.ts' {
  namespace Shortfin_TextToImage_SDXL_Client_Request_Body {
    export type {
      Shortfin_TextToImage_SDXL_Client_Request_Body_Batched as Batched,
    };
  }
}

export type {
  Shortfin_TextToImage_SDXL_Client_Request_Body,
};
