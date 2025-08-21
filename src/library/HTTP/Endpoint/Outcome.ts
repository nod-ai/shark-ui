import type Attempt from '@/library/Attempt';

import type {
  HTTP_Endpoint_Error_Request,
} from './RequestError';

import type {
  HTTP_Endpoint_Error_Response,
} from './ResponseError';

type HTTP_Endpoint_Outcome = Attempt.Outcome<
  unknown,
  HTTP_Endpoint_Error_Request | HTTP_Endpoint_Error_Response
>;

export type {
  HTTP_Endpoint_Outcome,
};
