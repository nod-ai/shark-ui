import type Attempt from '@/library/Attempt';
import type Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';
import type HTTP from '@/library/HTTP';

type Shortfin_TextToImage_SDXL_Client_Request_Outcome = Attempt.Outcome<
  Base64CharacterEncodedByteSequence,
  | HTTP.Endpoint.Error_Request
  | HTTP.Endpoint.Error_Response
>;

export type {
  Shortfin_TextToImage_SDXL_Client_Request_Outcome,
};
