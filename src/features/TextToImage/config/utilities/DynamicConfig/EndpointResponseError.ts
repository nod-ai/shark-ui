import type {
  URLPath,
} from '@/library/customTypes/URLComponent';

class DynamicConfig_EndpointResponseError extends Error {
  public constructor(given: {
    endpoint: URLPath;
    response: Response;
  }) {
    super(`Expected JSON response from "${given.endpoint.toString()}", but received content-type: ${given.response.headers.get('Content-Type') ?? ''}`);
    this.name = 'DynamicConfig_EndpointResponseError';
  }
}

export default DynamicConfig_EndpointResponseError;
