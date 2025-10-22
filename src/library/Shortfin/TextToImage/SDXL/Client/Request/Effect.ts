import type {
  HttpClientError,
} from '@effect/platform';

import type {
  Effect,
} from 'effect';

import type Sequence from '@/library/Sequence';

type Shortfin_TextToImage_SDXL_Client_Request_Effect = Effect.Effect<
  Sequence.Byte.Encoded.Base64,
  HttpClientError.HttpClientError
>;

export type {
  Shortfin_TextToImage_SDXL_Client_Request_Effect,
};
