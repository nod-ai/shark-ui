import type {
  HTTP_Endpoint_Error_FailedToSendRequest,
} from './FailedToSendRequest';

import type {
  HTTP_Endpoint_Error_IndigestibleResponseBody,
} from './IndigestibleResponseBody';

import type {
  HTTP_Endpoint_Error_Response,
} from './Response';

type HTTP_Endpoint_Error_Any =
  | HTTP_Endpoint_Error_FailedToSendRequest
  | HTTP_Endpoint_Error_Response
  | HTTP_Endpoint_Error_IndigestibleResponseBody
;

export type {
  HTTP_Endpoint_Error_Any,
};
