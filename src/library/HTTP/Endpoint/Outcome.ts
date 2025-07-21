import type Attempt from '@/library/Attempt';

import type {
  HTTP_Endpoint_RequestError,
} from './RequestError';

import type {
  HTTP_Endpoint_ResponseError,
} from './ResponseError';

type HTTP_Endpoint_Outcome = Attempt.Outcome<
  unknown,
  HTTP_Endpoint_RequestError | HTTP_Endpoint_ResponseError
>;

export type {
  HTTP_Endpoint_Outcome,
};
