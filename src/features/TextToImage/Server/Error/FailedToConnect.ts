import Attempt from '@/library/Attempt';

class TextToImage_Server_Error_FailedToConnect
  extends Attempt.Error.Actionable<
    'TextToImage_Server_Error_FailedToConnect'
  > {
  public override name = 'TextToImage_Server_Error_FailedToConnect' as const;

  public constructor(
    public readonly endpoint: URL,
  ) {
    super(`Failed to reach the text-to-image server at "${endpoint.origin}".`);
  }
}

export {
  TextToImage_Server_Error_FailedToConnect,
};
