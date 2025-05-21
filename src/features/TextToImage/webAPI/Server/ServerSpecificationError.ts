import Attempt from '@/library/Attempt';

import type {
  URLPath,
} from '@/library/customTypes/URLComponent';

class TextToImage_Server_SpecificationError extends Attempt.ActionableError<'TextToImage_Server_SpecificationError'> {
  public constructor(
    given: {
      environmentKey: string;
      file: URLPath;
      endpoint: URLPath;
    },
  ) {
    const serverNotSpecifiedErrorMessage = [
      'No text-to-image server was specified!',
      'Either:',
      `a) supply it's corresponding environment variable named \`${given.environmentKey}\` and rebuild`,
      `b) specify it within ${given.file.toString()}`,
      'OR',
      `c) specify it within the response from ${given.endpoint.toString()}`,
    ].join('\n');

    super(serverNotSpecifiedErrorMessage);
    this.name = 'TextToImage_Server_SpecificationError';
  }
}

export default TextToImage_Server_SpecificationError;
