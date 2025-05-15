import {
  ActionableError,
} from '@/library/Attempt';

import type {
  URLPath,
} from '@/library/customTypes/URLComponent';

class DynamicConfig_FetchingError extends ActionableError<'DynamicConfigFetchError'> {
  public constructor(givenEndpoint: URLPath) {
    super(`Failed to fetch text-to-image config from endpoint: ${givenEndpoint.toString()}`);
    this.name = 'DynamicConfig_FetchingError';
  }
}

export default DynamicConfig_FetchingError;
