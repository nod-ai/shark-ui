import type {
  URLPath,
} from '@/library/customTypes/URLComponent';

class DynamicConfigFetchingError extends Error {
  public constructor(givenEndpoint: URLPath) {
    super(`Failed to fetch text-to-image config from endpoint: ${givenEndpoint.toString()}`);
    this.name = 'DynamicConfigFetchError';
  }
}

export default DynamicConfigFetchingError;
