import Attempt from '@/library/Attempt';

import type {
  URLComponent_Path,
} from '@/library/URLComponent';

class TextToImage_StaticConfigReadingError
  extends Attempt.ActionableError<
  'TextToImage_StaticConfigReadingError'
> {
  public override name = 'TextToImage_StaticConfigReadingError' as const;

  public constructor(
    givenFile: URLComponent_Path,
    givenResponse: Response,
  ) {
    super(`Failed to read config at "${givenFile.toString()}". Cause: "${givenResponse.statusText}"`);
  }
}

export {
  TextToImage_StaticConfigReadingError as default,
};
