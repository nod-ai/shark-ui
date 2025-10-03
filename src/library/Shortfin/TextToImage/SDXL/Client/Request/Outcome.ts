import type Attempt from '@/library/Attempt';
import type HTTP from '@/library/HTTP';
import type Sequence from '@/library/Sequence';

type Shortfin_TextToImage_SDXL_Client_Request_Outcome = Attempt.Outcome<
  Sequence.Byte.Encoded.Base64_dep,
  HTTP.Endpoint.Error.Any
>;

export type {
  Shortfin_TextToImage_SDXL_Client_Request_Outcome,
};
