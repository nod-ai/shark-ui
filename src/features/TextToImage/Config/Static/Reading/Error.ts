import Attempt from '@/library/Attempt';

import type {
  URLComponent_Path,
} from '@/library/URLComponent';

class TextToImage_Config_Static_Reading_Error
  extends Attempt.Error_Actionable<
    'TextToImage_Config_Static_Reading_Error'
  > {
  public override name = 'TextToImage_Config_Static_Reading_Error' as const;

  public constructor(
    givenFile: URLComponent_Path,
    givenResponse: Response,
  ) {
    super(`Failed to read config at "${givenFile.toString()}". Cause: "${givenResponse.statusText}"`);
  }
}

export {
  TextToImage_Config_Static_Reading_Error,
};
