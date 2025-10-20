import type {
  Effect,
} from 'effect';

import type {
  HTTP_Endpoint_Error,
} from './Error';

type HTTP_Endpoint_Effect = Effect.Effect<
  unknown,
  HTTP_Endpoint_Error.Any
>;

export type {
  HTTP_Endpoint_Effect,
};
