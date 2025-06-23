import type {
  HTTP_Response_StatusCode_Error,
} from './Error';

import type {
  HTTP_Response_StatusCode_Success,
} from './Success';

type HTTP_Response_StatusCode_Any =
  | HTTP_Response_StatusCode_Success
  | HTTP_Response_StatusCode_Error.Any
;

export type {
  HTTP_Response_StatusCode_Any,
};
