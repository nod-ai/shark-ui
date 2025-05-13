import {
  ActionableError,
} from '@/library/Attempt';

class TextToImage_Server_ConnectionError extends ActionableError<'TextToImage_ServerConnectionError'> {
  public constructor() {
    const message = [
      'Failed to reach the text-to-image server.',
      `Are you sure it's running?`,
    ].join('\n');

    super(message);
    this.name = 'TextToImage_ServerConnectionError';
  }
}

export default TextToImage_Server_ConnectionError;
