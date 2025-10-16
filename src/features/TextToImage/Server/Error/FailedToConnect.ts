import {
  Data,
} from 'effect';

class TextToImage_Server_Error_FailedToConnect
  extends Data.TaggedError(
    'TextToImage_Server_Error_FailedToConnect',
  )<{
    endpoint: URL;
  }> {
  public override get message(): string {
    return `Failed to reach the text-to-image server at "${this.endpoint.origin}".`;
  }
}

export {
  TextToImage_Server_Error_FailedToConnect,
};
