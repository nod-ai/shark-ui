import type {
  HTTP_Endpoint_Error_FailedToSendRequest,
} from './FailedToSendRequest';

import type {
  HTTP_Endpoint_Error_IndigestibleResponseBody,
} from './IndigestibleResponseBody';

import type {
  HTTP_Endpoint_Error_RespondedWithFailure,
} from './RespondedWithFailure';

type HTTP_Endpoint_Error_Any =
  | HTTP_Endpoint_Error_FailedToSendRequest
  | HTTP_Endpoint_Error_RespondedWithFailure
  | HTTP_Endpoint_Error_IndigestibleResponseBody
;

export type {
  HTTP_Endpoint_Error_Any,
};
