import type {
  Exit,
} from 'effect';

import type {
  HTTP_Endpoint_Error,
} from './Error';

type HTTP_Endpoint_Exit = Exit.Exit<
  unknown,
  HTTP_Endpoint_Error.Any
>;

export type {
  HTTP_Endpoint_Exit,
};
