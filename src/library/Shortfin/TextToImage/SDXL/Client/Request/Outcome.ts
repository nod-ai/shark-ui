import type Attempt from '@/library/Attempt';
import type Base64CharacterEncodedByteSequence from '@/library/Base64CharacterEncodedByteSequence';
import type HTTP from '@/library/HTTP';

type Shortfin_TextToImage_SDXL_Client_Request_Outcome = Attempt.Outcome<
  Base64CharacterEncodedByteSequence,
  HTTP.Endpoint.Error.Any
>;

export type {
  Shortfin_TextToImage_SDXL_Client_Request_Outcome,
};
