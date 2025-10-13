import Attempt from '@/library/Attempt';
import type URLComponent from '@/library/URLComponent';

class TextToImage_Config_Dynamic_Fetching_Error
  extends Attempt.Error.Actionable<
    'TextToImage_Config_Dynamic_Fetching_Error'
  > {
  public override name = 'TextToImage_Config_Dynamic_Fetching_Error' as const;

  public constructor(
    public readonly endpoint: URLComponent.Path,
    givenCause: Error,
  ) {
    super(`Failed to fetch config from "${endpoint}".`, {
      cause: givenCause,
    });
  }
}

export {
  TextToImage_Config_Dynamic_Fetching_Error,
};
