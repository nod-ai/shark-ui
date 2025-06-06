import Attempt from '@/library/Attempt';

import type {
  URLPath,
} from '@/library/customTypes/URLComponent';

class TextToImage_Server_SpecificationError extends Attempt.ActionableError<'TextToImage_Server_SpecificationError'> {
  public constructor(
    public readonly environmentKey: string,
    public readonly file: URLPath,
    public readonly endpoint: URLPath,
  ) {
    super('Failed to determine text-to-image server');
    this.name = 'TextToImage_Server_SpecificationError';
  }
}

export {
  TextToImage_Server_SpecificationError as default,
};
