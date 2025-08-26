import type Attempt from '@/library/Attempt';
import type Sequence_Byte_Encoded_Base64 from '@/library/Base64CharacterEncodedByteSequence';
import type HTTP from '@/library/HTTP';

type Shortfin_TextToImage_SDXL_Client_Request_Outcome = Attempt.Outcome<
  Sequence_Byte_Encoded_Base64,
  HTTP.Endpoint.Error.Any
>;

export type {
  Shortfin_TextToImage_SDXL_Client_Request_Outcome,
};
