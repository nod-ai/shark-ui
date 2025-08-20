import Attempt from '@/library/Attempt';

import type {
  URLComponent_Path,
} from '@/library/URLComponent';

class TextToImage_Config_Dynamic_FetchingError
  extends Attempt.ActionableError<
  'TextToImage_Config_Dynamic_FetchingError'
> {
  public override name = 'TextToImage_Config_Dynamic_FetchingError' as const;

  public constructor(
    givenEndpoint: URLComponent_Path,
  ) {
    super(`Failed to fetch text-to-image config from endpoint: ${givenEndpoint.toString()}`);
  }
}

export {
  TextToImage_Config_Dynamic_FetchingError as default,
};
