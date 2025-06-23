import type {
  HTTP_Response_StatusCode_Error_Client,
} from './Client';

import type {
  HTTP_Response_StatusCode_Error_Server,
} from './Server';

type HTTP_Response_StatusCode_Error_Any =
  | HTTP_Response_StatusCode_Error_Client
  | HTTP_Response_StatusCode_Error_Server;

export type {
  HTTP_Response_StatusCode_Error_Any,
};
