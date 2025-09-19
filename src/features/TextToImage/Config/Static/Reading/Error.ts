import Attempt from '@/library/Attempt';
import type URLComponent from '@/library/URLComponent';

class TextToImage_Config_Static_Reading_Error
  extends Attempt.Error.Actionable<
    'TextToImage_Config_Static_Reading_Error'
  > {
  public override name = 'TextToImage_Config_Static_Reading_Error' as const;

  public constructor(
    public readonly filePath: URLComponent.Path,
    givenCause: Error,
  ) {
    super(`Failed to read config at "${filePath.toString()}".`, {
      cause: givenCause,
    });
  }
}

export {
  TextToImage_Config_Static_Reading_Error,
};
