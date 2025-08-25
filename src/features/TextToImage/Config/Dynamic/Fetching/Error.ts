import Attempt from '@/library/Attempt';

import type {
  URLComponent_Path,
} from '@/library/URLComponent';

class TextToImage_Config_Dynamic_Fetching_Error
  extends Attempt.Error_Actionable<
  'TextToImage_Config_Dynamic_Fetching_Error'
> {
  public override name = 'TextToImage_Config_Dynamic_Fetching_Error' as const;

  public constructor(
    givenEndpoint: URLComponent_Path,
  ) {
    super(`Failed to fetch text-to-image config from endpoint: ${givenEndpoint.toString()}`);
  }
}

export {
  TextToImage_Config_Dynamic_Fetching_Error as default,
};
