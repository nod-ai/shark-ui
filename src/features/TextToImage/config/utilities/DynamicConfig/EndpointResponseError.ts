import Attempt from '@/library/Attempt';

import type {
  URLComponent_Path,
} from '@/library/URLComponent';

class TextToImage_Config_Dynamic_EndpointResponseError
  extends Attempt.ActionableError<
  'TextToImage_Config_Dynamic_EndpointResponseError'
> {
  public override name = 'TextToImage_Config_Dynamic_EndpointResponseError' as const;

  public constructor(given: {
    endpoint: URLComponent_Path;
    response: Response;
  }) {
    super(`Expected JSON response from "${given.endpoint.toString()}", but received content-type: ${given.response.headers.get('Content-Type') ?? ''}`);
  }
}

export {
  TextToImage_Config_Dynamic_EndpointResponseError as default,
};
