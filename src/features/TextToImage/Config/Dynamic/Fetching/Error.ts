import Attempt from '@/library/Attempt';
import type URLComponent from '@/library/URLComponent';

class TextToImage_Config_Dynamic_Fetching_Error
  extends Attempt.Error.Tagged(
    'TextToImage_Config_Dynamic_Fetching_Error',
  ) {
  public constructor(
    public readonly endpoint: URLComponent.Path,
    givenCause: Error,
  ) {
    super({
      message: `Failed to fetch config from "${endpoint}".`,
      cause  : givenCause,
    });
  }
}

export {
  TextToImage_Config_Dynamic_Fetching_Error,
};
