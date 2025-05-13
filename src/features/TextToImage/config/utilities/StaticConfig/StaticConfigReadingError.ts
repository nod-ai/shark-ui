import {
  ActionableError,
} from '@/library/Attempt';

import type {
  URLPath,
} from '@/library/customTypes/URLComponent';

class StaticConfigReadingError extends ActionableError<'StaticConfigReadingError'> {
  public constructor(givenFile: URLPath, givenResponse: Response) {
    super(`Failed to read config at "${givenFile.toString()}". Cause: "${givenResponse.statusText}"`);
    this.name = 'StaticConfigReadError';
  }
}

export default StaticConfigReadingError;
