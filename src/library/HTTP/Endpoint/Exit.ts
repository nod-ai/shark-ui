import type Attempt from '@/library/Attempt';

import type {
  HTTP_Endpoint_Error,
} from './Error';

type HTTP_Endpoint_Exit = Attempt.Exit<
  unknown,
  HTTP_Endpoint_Error.Any
>;

export type {
  HTTP_Endpoint_Exit,
};
