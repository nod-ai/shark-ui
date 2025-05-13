import {
  ActionableError,
} from '@/library/Attempt';

import type {
  URLPath,
} from '@/library/customTypes/URLComponent';

class DynamicConfig_EndpointResponseError extends ActionableError<'DynamicConfig_EndpointResponseError'> {
  public constructor(given: {
    endpoint: URLPath;
    response: Response;
  }) {
    super(`Expected JSON response from "${given.endpoint.toString()}", but received content-type: ${given.response.headers.get('Content-Type') ?? ''}`);
    this.name = 'DynamicConfig_EndpointResponseError';
  }
}

export default DynamicConfig_EndpointResponseError;
