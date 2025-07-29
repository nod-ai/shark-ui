import Attempt from '@/library/Attempt';

import type {
  URLPath,
} from '@/library/URLComponent/exports';

class DynamicConfig_EndpointResponseError
  extends Attempt.ActionableError<
  'DynamicConfig_EndpointResponseError'
> {
  public override name = 'DynamicConfig_EndpointResponseError' as const;

  public constructor(given: {
    endpoint: URLPath;
    response: Response;
  }) {
    super(`Expected JSON response from "${given.endpoint.toString()}", but received content-type: ${given.response.headers.get('Content-Type') ?? ''}`);
  }
}

export {
  DynamicConfig_EndpointResponseError as default,
};
