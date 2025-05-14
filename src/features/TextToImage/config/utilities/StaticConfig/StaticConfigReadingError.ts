import type {
  URLPath,
} from '@/library/customTypes/URLComponent';

class StaticConfigReadingError extends Error {
  public constructor(givenFile: URLPath, givenResponse: Response) {
    super(`Failed to read config at "${givenFile.toString()}". Cause: "${givenResponse.statusText}"`);
    this.name = 'StaticConfigReadError';
  }
}

export default StaticConfigReadingError;
