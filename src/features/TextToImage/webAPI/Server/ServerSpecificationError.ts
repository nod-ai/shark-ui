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
    const userFacingMessage = [
      'No text-to-image server was specified!',
      'Either:',
      `a) supply it's corresponding environment variable named \`${environmentKey}\` and rebuild`,
      `b) specify it within ${file.toString()}`,
      'OR',
      `c) specify it within the response from ${endpoint.toString()}`,
    ].join('\n');

    super(userFacingMessage);
    this.name = 'TextToImage_Server_SpecificationError';
  }
}

export {
  TextToImage_Server_SpecificationError as default,
};
