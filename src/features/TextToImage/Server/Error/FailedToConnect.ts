import Attempt from '@/library/Attempt';

class TextToImage_Server_Error_FailedToConnect
  extends Attempt.Error.Tagged(
    'TextToImage_Server_Error_FailedToConnect',
  ) {
  public constructor(
    public readonly endpoint: URL,
  ) {
    super(`Failed to reach the text-to-image server at "${endpoint.origin}".`);
  }
}

export {
  TextToImage_Server_Error_FailedToConnect,
};
