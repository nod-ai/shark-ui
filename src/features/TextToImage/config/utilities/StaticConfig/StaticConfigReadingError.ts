import Attempt from '@/library/Attempt';

import type {
  URLPath,
} from '@/library/URLComponent/exports';

class StaticConfigReadingError
  extends Attempt.ActionableError<
  'StaticConfigReadingError'
> {
  public override name = 'StaticConfigReadError' as const;

  public constructor(
    givenFile: URLPath,
    givenResponse: Response,
  ) {
    super(`Failed to read config at "${givenFile.toString()}". Cause: "${givenResponse.statusText}"`);
  }
}

export {
  StaticConfigReadingError as default,
};
