import Attempt from '@/library/Attempt';
import type URLComponent from '@/library/URLComponent';

class TextToImage_Config_Static_Reading_Error
  extends Attempt.Error.Tagged(
    'TextToImage_Config_Static_Reading_Error',
  ) {
  public constructor(
    public readonly filePath: URLComponent.Path,
    givenCause: Error,
  ) {
    super({
      message: `Failed to read config at "${filePath}".`,
      cause  : givenCause,
    });
  }
}

export {
  TextToImage_Config_Static_Reading_Error,
};
