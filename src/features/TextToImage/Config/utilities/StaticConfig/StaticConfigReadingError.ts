import Attempt from '@/library/Attempt';

import type {
  URLComponent_Path,
} from '@/library/URLComponent';

class TextToImage_Config_Static_ReadingError
  extends Attempt.Error_Actionable<
  'TextToImage_Config_Static_ReadingError'
> {
  public override name = 'TextToImage_Config_Static_ReadingError' as const;

  public constructor(
    givenFile: URLComponent_Path,
    givenResponse: Response,
  ) {
    super(`Failed to read config at "${givenFile.toString()}". Cause: "${givenResponse.statusText}"`);
  }
}

export {
  TextToImage_Config_Static_ReadingError as default,
};
