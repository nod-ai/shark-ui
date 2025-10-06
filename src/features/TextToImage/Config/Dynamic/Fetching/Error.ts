import Attempt from '@/library/Attempt';
import type URLComponent from '@/library/URLComponent';

class TextToImage_Config_Dynamic_Fetching_Error
  extends Attempt.Error.Actionable<
    'TextToImage_Config_Dynamic_Fetching_Error'
  > {
  public override name = 'TextToImage_Config_Dynamic_Fetching_Error' as const;

  public constructor(
    public readonly endpoint: URLComponent.Path_dep,
    givenCause: Error,
  ) {
    super(`Failed to fetch config from "${endpoint.toString()}".`, {
      cause: givenCause,
    });
  }
}

export {
  TextToImage_Config_Dynamic_Fetching_Error,
};
