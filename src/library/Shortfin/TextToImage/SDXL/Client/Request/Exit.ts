import type {
  Exit,
} from 'effect';

import type HTTP from '@/library/HTTP';
import type Sequence from '@/library/Sequence';

type Shortfin_TextToImage_SDXL_Client_Request_Exit = Exit.Exit<
  Sequence.Byte.Encoded.Base64,
  HTTP.Endpoint.Error.Any
>;

export type {
  Shortfin_TextToImage_SDXL_Client_Request_Exit,
};
