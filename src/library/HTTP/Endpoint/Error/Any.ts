import type {
  HTTP_Endpoint_Error_Request,
} from './Request';

import type {
  HTTP_Endpoint_Error_Response,
} from './Response';

type HTTP_Endpoint_Error_Any =
  | HTTP_Endpoint_Error_Request
  | HTTP_Endpoint_Error_Response
;

export type {
  HTTP_Endpoint_Error_Any,
};
