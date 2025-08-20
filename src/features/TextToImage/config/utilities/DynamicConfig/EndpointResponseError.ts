import Attempt from '@/library/Attempt';

import type {
  URLComponent_Path,
} from '@/library/URLComponent';

class DynamicConfig_EndpointResponseError
  extends Attempt.ActionableError<
  'DynamicConfig_EndpointResponseError'
> {
  public override name = 'DynamicConfig_EndpointResponseError' as const;

  public constructor(given: {
    endpoint: URLComponent_Path;
    response: Response;
  }) {
    super(`Expected JSON response from "${given.endpoint.toString()}", but received content-type: ${given.response.headers.get('Content-Type') ?? ''}`);
  }
}

export {
  DynamicConfig_EndpointResponseError as default,
};
