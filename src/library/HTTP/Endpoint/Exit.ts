import type Attempt from '@/library/Attempt';

import type {
  HTTP_Endpoint_Error,
} from './Error';

type HTTP_Endpoint_Outcome = Attempt.Outcome<
  unknown,
  HTTP_Endpoint_Error.Any
>;

export type {
  HTTP_Endpoint_Outcome,
};
