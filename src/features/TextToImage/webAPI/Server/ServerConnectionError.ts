import Attempt from '@/library/Attempt';

import type {
  URLOrigin,
} from '@/library/customTypes/URLComponent';

class TextToImage_Server_ConnectionError extends Attempt.ActionableError<'TextToImage_ServerConnectionError'> {
  public constructor(
    public readonly origin: URLOrigin,
  ) {
    const message = [
      `Failed to reach the text-to-image server at "${origin.toString()}".`,
      `Are you sure it's running?`,
    ].join('\n');

    super(message);
    this.name = 'TextToImage_ServerConnectionError';
  }
}

export {
  TextToImage_Server_ConnectionError as default,
};
