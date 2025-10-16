import {
  Data,
} from 'effect';

class TextToImage_Server_Error_FailedToConnect
  extends Data.TaggedError(
    'TextToImage_Server_Error_FailedToConnect',
  )<{
    message: string;
  }> {
  public constructor(
    public readonly endpoint: URL,
  ) {
    super({
      message: `Failed to reach the text-to-image server at "${endpoint.origin}".`,
    });
  }
}

export {
  TextToImage_Server_Error_FailedToConnect,
};
