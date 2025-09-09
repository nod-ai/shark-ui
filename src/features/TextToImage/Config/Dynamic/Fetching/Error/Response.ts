import Attempt from '@/library/Attempt';
import type URLComponent from '@/library/URLComponent';

class TextToImage_Config_Dynamic_Fetching_Error_Response
  extends Attempt.Error.Actionable<
    'TextToImage_Config_Dynamic_Fetching_Error_Response'
  > {
  public override name = 'TextToImage_Config_Dynamic_Fetching_Error_Response' as const;

  public constructor(given: {
    endpoint: URLComponent.Path;
    response: Response;
  }) {
    super(`Expected JSON response from "${given.endpoint.toString()}", but received content-type: ${given.response.headers.get('Content-Type') ?? ''}`);
  }
}

export {
  TextToImage_Config_Dynamic_Fetching_Error_Response,
};
