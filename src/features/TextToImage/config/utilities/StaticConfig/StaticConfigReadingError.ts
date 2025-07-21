import Attempt from '@/library/Attempt';

import type {
  URLPath,
} from '@/library/URLComponent';

class StaticConfigReadingError
  extends Attempt.ActionableError<
  'StaticConfigReadingError'
> {
  public constructor(
    givenFile: URLPath,
    givenResponse: Response,
  ) {
    super(`Failed to read config at "${givenFile.toString()}". Cause: "${givenResponse.statusText}"`);
    this.name = 'StaticConfigReadError';
  }
}

export {
  StaticConfigReadingError as default,
};
