import Attempt from '@/library/Attempt';
import type * as URLComponent from '@/library/URLComponent';

class TextToImage_Config_Dynamic_Fetching_Error_Request
  extends Attempt.Error.Actionable<
    'TextToImage_Config_Dynamic_Fetching_Error_Request'
  > {
  public override name = 'TextToImage_Config_Dynamic_Fetching_Error_Request' as const;

  public constructor(
    givenEndpoint: URLComponent.Path,
  ) {
    super(`Failed to fetch text-to-image config from endpoint: ${givenEndpoint.toString()}`);
  }
}

export {
  TextToImage_Config_Dynamic_Fetching_Error_Request,
};
