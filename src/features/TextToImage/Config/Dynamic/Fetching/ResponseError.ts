import Attempt from '@/library/Attempt';

import type {
  URLComponent_Path,
} from '@/library/URLComponent';

class TextToImage_Config_Dynamic_Fetching_ResponseError
  extends Attempt.Error_Actionable<
  'TextToImage_Config_Dynamic_Fetching_ResponseError'
> {
  public override name = 'TextToImage_Config_Dynamic_Fetching_ResponseError' as const;

  public constructor(given: {
    endpoint: URLComponent_Path;
    response: Response;
  }) {
    super(`Expected JSON response from "${given.endpoint.toString()}", but received content-type: ${given.response.headers.get('Content-Type') ?? ''}`);
  }
}

export {
  TextToImage_Config_Dynamic_Fetching_ResponseError as default,
};
