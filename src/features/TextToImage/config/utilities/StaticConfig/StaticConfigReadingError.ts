import Attempt from '@/library/Attempt';

import type {
  URLComponent_Path,
} from '@/library/URLComponent';

class StaticConfigReadingError
  extends Attempt.ActionableError<
  'StaticConfigReadingError'
> {
  public override name = 'StaticConfigReadingError' as const;

  public constructor(
    givenFile: URLComponent_Path,
    givenResponse: Response,
  ) {
    super(`Failed to read config at "${givenFile.toString()}". Cause: "${givenResponse.statusText}"`);
  }
}

export {
  StaticConfigReadingError as default,
};
