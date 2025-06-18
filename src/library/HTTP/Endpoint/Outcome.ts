import type Attempt from '@/library/Attempt';

import type HTTPResponseError from '../HTTPResponseError';

type HTTP_Endpoint_Outcome = Attempt.Outcome<
  unknown,
  HTTPResponseError
>;

export type {
  HTTP_Endpoint_Outcome,
};
