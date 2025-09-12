import {
  Shortfin_TextToImage_SDXL_Client_Request,
} from './Request';

import {
  Shortfin_TextToImage_SDXL_Client_Response,
} from './Response';

import {
  Shortfin_TextToImage_SDXL_Client,
} from './definition.declared.ts';

Shortfin_TextToImage_SDXL_Client.Request = Shortfin_TextToImage_SDXL_Client_Request;
Shortfin_TextToImage_SDXL_Client.Response = Shortfin_TextToImage_SDXL_Client_Response;

declare module './definition.declared.ts' {
  namespace Shortfin_TextToImage_SDXL_Client {
    export {
      Shortfin_TextToImage_SDXL_Client_Request as Request,
      Shortfin_TextToImage_SDXL_Client_Response as Response,
    };
  }
}
